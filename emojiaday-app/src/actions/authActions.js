import auth0 from 'auth0-js';
import ReactGA from 'react-ga';
import config from '../config';
import history from '../history';

const AUTH_ACCESS_TOKEN = 'auth_access_token';
const AUTH_ID_TOKEN = 'auth_id_token';
const AUTH_EXPIRES_AT = 'auth_expires_at';

const auth = new auth0.WebAuth({
  domain: config.auth0.domain,
  clientID: config.auth0.clientID,
  redirectUri: config.auth0.redirectUri,
  audience: config.auth0.audience,
  responseType: 'token id_token',
  scope: 'openid',
});

const setSession = (authResult) => {
  const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
  localStorage.setItem(AUTH_ACCESS_TOKEN, authResult.accessToken);
  localStorage.setItem(AUTH_ID_TOKEN, authResult.idToken);
  localStorage.setItem(AUTH_EXPIRES_AT, expiresAt);
};

const setLoginExpiryTimeout = (dispatch) => {
  const sessionTimeout = localStorage.getItem(AUTH_EXPIRES_AT) - new Date().getTime();
  if (sessionTimeout > 0) {
    setTimeout(() => {
      if (config.features.authRenew) {
        auth.checkSession({}, (err, result) => {
          if (err) {
            dispatch({ type: 'LOGIN_EXPIRED' });
            ReactGA.event({ category: 'Authentication', action: 'Token Renew Error' });
            history.replace('/');
          } else {
            setSession(result);
            const { expiresAt } = result;
            dispatch({
              type: 'AUTH_RENEW_SUCCESS',
              payload: {
                accessToken: result.accessToken,
                idToken: result.idToken,
                expiresAt,
              },
            });
            ReactGA.event({ category: 'Authentication', action: 'Token Renew Success' });
            setLoginExpiryTimeout(dispatch);
          }
        });
      } else {
        dispatch({ type: 'LOGIN_EXPIRED' });
        ReactGA.event({ category: 'Authentication', action: 'Login Expired' });
        history.replace('/');
      }
    }, sessionTimeout);
  }
};

export function checkAuthentication() {
  return (dispatch) => {
    const expiresAt = JSON.parse(localStorage.getItem(AUTH_EXPIRES_AT));
    if (new Date().getTime() < expiresAt) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          accessToken: localStorage.getItem(AUTH_ACCESS_TOKEN),
          idToken: localStorage.getItem(AUTH_ID_TOKEN),
          expiresAt,
        },
      });
      setLoginExpiryTimeout(dispatch);
    }
  };
}

export function requestLogin() {
  return (dispatch) => {
    auth.authorize();
    dispatch({ type: 'LOGIN_REQUESTED' });
  };
}

export function scheduleLoginExpiry() {
  return (dispatch) => {
    setLoginExpiryTimeout(dispatch);
  };
}

export function receiveLogin() {
  return (dispatch) => {
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            accessToken: authResult.accessToken,
            idToken: authResult.idToken,
            expiresAt,
          },
        });
        ReactGA.event({ category: 'Authentication', action: 'Login Success' });
        setLoginExpiryTimeout(dispatch);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem(AUTH_ACCESS_TOKEN);
    localStorage.removeItem(AUTH_ID_TOKEN);
    localStorage.removeItem(AUTH_EXPIRES_AT);
    ReactGA.event({ category: 'Authentication', action: 'Logout' });
    dispatch({ type: 'LOGOUT_SUCCESS' });
    history.replace('/');
  };
}

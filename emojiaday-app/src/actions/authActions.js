import auth0 from 'auth0-js';
import config from '../config';
import history from '../history';

const auth = new auth0.WebAuth({
  domain: config.auth0.domain,
  clientID: config.auth0.clientID,
  redirectUri: config.auth0.redirectUri,
  audience: config.auth0.audience,
  responseType: 'token id_token',
  scope: 'openid',
});

const setSession = (authResult) => {
  let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
  // this.scheduleRenewal();
};

export function requestLogin() {
  auth.authorize();
  return dispatch => dispatch({ type: 'LOGIN_REQUESTED' });
}

export function receiveLogin() {
  return (dispatch) => {
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
        dispatch({ type: 'LOGIN_SUCCESS' });
        history.replace('/');
      } else if (err) {
        dispatch({ type: 'LOGIN_FAILURE', payload: err });
        history.replace('/');
      }
    });
  };
}

export function loginError() {
  return dispatch => dispatch({ type: 'LOGIN_FAILURE' });
}

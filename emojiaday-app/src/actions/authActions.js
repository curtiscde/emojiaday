import auth0 from 'auth0-js';
import config from '../config';

const auth = new auth0.WebAuth({
  domain: config.auth0.domain,
  clientID: config.auth0.clientID,
  redirectUri: config.auth0.redirectUri,
  audience: config.auth0.audience,
  responseType: 'token id_token',
  scope: 'openid',
});

export function requestLogin() {
  return (dispatch) => {
    auth.authorize();
    dispatch({ type: 'LOGIN_REQUESTED' });
  };
};


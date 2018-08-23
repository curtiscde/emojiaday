import auth0 from 'auth0-js';
import history from '../history';
import config from '../config';
import ReactGA from 'react-ga';

export default class Auth {

  auth0 = new auth0.WebAuth({
    domain: config.auth0.domain,
    clientID: config.auth0.clientID,
    redirectUri: config.auth0.redirectUri,
    audience: config.auth0.audience,
    responseType: 'token id_token',
    scope: 'openid'
  });

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    ReactGA.event({
      category: 'Authentication',
      action: 'Logout'
    });
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

};
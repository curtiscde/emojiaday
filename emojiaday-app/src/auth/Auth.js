import auth0 from 'auth0-js';
import history from '../history';
import config from '../config';
import ReactGA from 'react-ga';

export default class Auth {
  tokenRenewalTimeout;

  auth0 = new auth0.WebAuth({
    domain: config.auth0.domain,
    clientID: config.auth0.clientID,
    redirectUri: config.auth0.redirectUri,
    audience: config.auth0.audience,
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    console.log('const');
    this.scheduleRenewal();
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    clearTimeout(this.tokenRenewalTimeout);
    ReactGA.event({
      category: 'Authentication',
      action: 'Logout'
    });
    history.replace('/');
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.scheduleRenewal();
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    console.log(expiresAt - new Date().getTime());
    return new Date().getTime() < expiresAt;
  }

  renewToken() {
    this.auth0.checkSession({},
      (err, result) => {
        if (err) {
          console.log(
            `Could not get a new token (${err.error}: ${err.error_description}).`
          );
          history.replace('/');
        } else {
          this.setSession(result);
          console.log(`Successfully renewed auth!`);
        }
      }
    );
  }

  scheduleRenewal() {
    console.log('scheduleRenewal fired');
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const delay = expiresAt - Date.now();
    console.log('schedrenew-delay', delay);
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken();
        console.log(`renew scheduled in ${delay}`);
      }, delay);
    }
  }
};
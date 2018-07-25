import auth0 from 'auth0-js';
import history from '../history';

export default class Auth {

  constructor(){
    this.auth0Domain = 'emojiaday.eu.auth0.com';
    this.auth0ClientID = 'sZqB91uimtN4z0WeBIs6BX6z0PqP4eJ4';
    this.auth0RedirectUri = 'http://localhost:3000/callback';
    this.auth0Audience = 'https://emojiaday-dev.com';
  }

  auth0 = new auth0.WebAuth({
    domain: this.auth0Domain,
    clientID: this.auth0ClientID,
    redirectUri: this.auth0RedirectUri,
    audience: this.auth0Audience,
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
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
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

};
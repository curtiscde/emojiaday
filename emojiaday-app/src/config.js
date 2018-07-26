const prod = {
  auth0: {
    domain: 'emojiaday.eu.auth0.com',
    clientID: 'irAJWsNpHU20Nfv4rODvDLjhjIQFoy5D',
    redirectUri: 'https://emojiaday.netlify.com/callback',
    audience: 'https://emojiaday.com',
  }
}

const dev = {
  auth0: {
    domain: 'emojiaday.eu.auth0.com',
    clientID: 'sZqB91uimtN4z0WeBIs6BX6z0PqP4eJ4',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://emojiaday-dev.com',
  }
}

const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;

export default config;
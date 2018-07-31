const prod = {
  auth0: {
    domain: 'emojiaday.eu.auth0.com',
    clientID: 'irAJWsNpHU20Nfv4rODvDLjhjIQFoy5D',
    redirectUri: 'https://emojiaday.netlify.com/callback',
    audience: 'https://emojiaday.com',
  },
  serviceUri: 'https://emojiaday-prod.herokuapp.com'
}

const dev = {
  auth0: {
    domain: 'emojiaday.eu.auth0.com',
    clientID: 'sZqB91uimtN4z0WeBIs6BX6z0PqP4eJ4',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://emojiaday-dev.com',
  },
  serviceUri: 'http://localhost:8080'
}

const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;

export default config;
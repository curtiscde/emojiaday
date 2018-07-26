import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Auth from '../auth/Auth';

export default class Login extends Component {
  render() {

    const auth = new Auth();

    const openAuth0 = () => {
      auth.login();
    };

    return (
      <Button color="primary" onClick={openAuth0}>
        Login
      </Button>
    );
  }
}

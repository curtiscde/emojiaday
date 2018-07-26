import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Auth from '../auth/Auth';

export default class Logout extends Component {
  render() {

    const auth = new Auth();

    const logout = () => {
      auth.logout();
    };

    return (
      <Button color="inherit" onClick={logout}>
        Logout
      </Button>
    );
  }
}

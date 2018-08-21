import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
// import Auth from '../auth/Auth';
import * as auth from '../actions/authActions';
import { connect } from 'react-redux';

class Login extends Component {
  render() {

    // const auth = new Auth();

    const openAuth0 = () => {
      // auth.login();
      this.props.dispatch(auth.requestLogin());
    };

    return (
      <Button color="inherit" onClick={openAuth0}>
        Login
      </Button>
    );
  }
}

export default connect()(Login);

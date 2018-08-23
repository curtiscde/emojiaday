import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Auth from '../auth/Auth';
import { requestLogin } from '../actions/authActions';

class Login extends Component {
  render() {

    const auth = new Auth();

    const openAuth0 = () => {
      // auth.login();
      this.props.dispatch(requestLogin());
    };

    return (
      <Button color="inherit" onClick={openAuth0}>
        Login
      </Button>
    );
  }
}

export default connect()(Login);

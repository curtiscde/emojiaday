import React, { Component } from 'react';
import Auth from '../auth/Auth';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export default class AuthCallback extends Component {
    render(){

        auth.handleAuthentication();

        return (
            <div>
                Loading...
            </div>
        );
    }
}
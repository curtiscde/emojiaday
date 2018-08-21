import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as auth from '../actions/authActions';

class AuthCallback extends Component {
  componentWillMount() {
    this.props.dispatch(auth.receiveLogin());
  }

  render() {
    return (
      <div>
        Loading...
      </div>
    );
  }
};

export default connect()(AuthCallback);

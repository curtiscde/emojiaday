import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receiveLogin } from '../actions/authActions';

class AuthCallback extends Component {
    componentDidMount() {
      this.props.dispatch(receiveLogin());
    }

    render(){
        return (
            <div>
                Loading...
            </div>
        );
    }
}

export default connect()(AuthCallback);

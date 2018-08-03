import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loading.css';

export default class Loading extends Component{
  render(){
    return (
      <div class={['loading']}>
        <CircularProgress size={80} />
      </div>
    );
  }
}
import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loading.css';

export default class Loading extends Component{
  render(){
    return (
      <div className={['loading']}>
        <CircularProgress size={80} />
      </div>
    );
  }
}
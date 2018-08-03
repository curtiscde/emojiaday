import React, { Component } from 'react';

export default class DayView extends Component{
  render(){
    return (
      <div>{this.props.match.params.day}</div>
    )
  }
}
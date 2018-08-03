import React, { Component } from 'react';

export default class DayView extends Component{

  constructor(){
    super();
    this.state = {
      entryLoaded: false,
      userEmojiId: null
    }
  }

  render(){
    return (
      <div>{this.props.match.params.day}</div>
    )
  }
}
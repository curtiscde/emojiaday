import React, { Component } from 'react';
import axios from 'axios';
import Config from '../config';

export default class DayView extends Component{

  constructor(){
    super();
    this.state = {
      dataLoaded: false,
      userEmojiId: null
    }
  }

  getData(){
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
      axios.get(`${Config.serviceUri}/api/entries/day/${this.props.match.params.day}`)
          .then(res => {
              this.setState({
                ...this.state,
                data: res.data,
                dataLoaded: true,
              });
          })
          .catch(function (error) {
            console.log(error);
            this.setState({
              ...this.state,
              dataLoaded: true
            });
          });
  }

  render(){
    return (
      <div>{this.props.match.params.day}</div>
    )
  }
}
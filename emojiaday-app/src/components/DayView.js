import React, { Component } from 'react';
import axios from 'axios';
import Config from '../config';
import moment from 'moment';
import Loading from './Loading';
import Typography from '@material-ui/core/Typography';
import { Emoji } from 'emoji-mart';

export default class DayView extends Component{

  constructor(){
    super();
    this.state = {
      dataLoaded: false,
      userEmojiId: null
    }
  }

  componentDidMount(){
    this.getData();
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

    const view = this.state.dataLoaded ?
      <div>
        <Typography variant="title">{moment(this.props.match.params.day).format('D MMMM YYYY')}</Typography>
        {this.state.data.userEntries.length ?
          <Emoji emoji={this.state.data.userEntries[0].emoji} set='twitter' size={64} />
          : null}
      </div>:
      <Loading/>

    return (
      <div>
        {view}
      </div>
    )
  }
}
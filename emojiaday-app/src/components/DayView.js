import React, { Component } from 'react';
import axios from 'axios';
import Config from '../config';
import moment from 'moment';
import Loading from './Loading';
import Typography from '@material-ui/core/Typography';
import { Emoji } from 'emoji-mart';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'; 
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              {moment(this.props.match.params.day).format('D MMMM YYYY')}
            </Typography>
          </Toolbar>
        </AppBar>
        {this.state.data.userEntries.length ?
          <Card>
            <CardContent>
              <Emoji emoji={this.state.data.userEntries[0].emoji} set='twitter' size={64} />
            </CardContent>
          </Card>
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
import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Config from '../config';

export default class AddEntry extends Component {

  constructor(props){
    super(props);

    this.state = {
      emoji: null
    };

    this.addEmoji = this.addEmoji.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addEmoji(data){
    this.setState({emoji: data.id});
  };

  handleSubmit(e){
    e.preventDefault();
    
    const emojiId = this.state.emoji;

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;
    axios.post(`${Config.serviceUri}/api/entry/day`, {
      day: '20180801',
      emoji: emojiId
    }).then(data => {
      console.log(data);
    });
    
  };

  render(){
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Card>
          <CardContent>
            <Typography variant="title">Add Entry</Typography>
            <Typography variant="subheading">Add your emoji of the day by selecting from the emoji picker below</Typography>
            <Picker
              emoji='grinning'
              set='twitter'
              title='Pick your emoji…'
              onSelect={this.addEmoji}
            />
          </CardContent>
          <CardActions>
            <Button type="submit" size="small">Submit</Button>
          </CardActions>
        </Card>
      </form>
    )
  }
}
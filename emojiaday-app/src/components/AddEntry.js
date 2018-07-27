import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

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

    console.log('emojiid', emojiId);
    
  };

  render(){
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Card>
          <CardContent>
            <Typography variant="title">Add Entry</Typography>
            <Typography variant="subheading">Add your emoji of the day by selecting from the emoji picker below</Typography>
            <Picker title='Pick your emoji…' onSelect={this.addEmoji} />
          </CardContent>
          <CardActions>
            <Button type="submit" size="small">Submit</Button>
          </CardActions>
        </Card>
      </form>
    )
  }
}
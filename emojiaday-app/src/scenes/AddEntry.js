import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart'
import Config from '../config';
import history from '../history';
import ReactGA from 'react-ga';

export default class AddEntry extends Component {

  constructor(props){
    super(props);

    this.state = {
      showPicker: false,
      emoji: null
    };

    this.showEmojiPicker = this.showEmojiPicker.bind(this);
    this.addEmoji = this.addEmoji.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showEmojiPicker(){
    this.setState({
      ...this.state,
      showPicker: true
    });
  }

  addEmoji(data){
    this.setState({
      ...this.state,
      showPicker: false,
      emoji: data.id
    });
  };

  handleSubmit(e){
    e.preventDefault();
    
    const emojiId = this.state.emoji;

    ReactGA.event({
      category: 'Emoji Entry',
      action: 'Submit',
      label: emojiId
    });

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    axios.post(`${Config.serviceUri}/api/entry/day`, {
      emoji: emojiId
    }).then(data => {
      history.replace('/');
    });
    
  };

  render(){

    const selectedEmoji = this.state.emoji ? <div><Emoji emoji={this.state.emoji} set='twitter' size={64} /></div> : null;

    const selectEmoji = this.state.showPicker ?
      <Picker
        emoji='grinning'
        set='twitter'
        title='Pick your emoji…'
        onSelect={this.addEmoji}
      />
      : <Button
          size="small"
          onClick={this.showEmojiPicker}>
          Select Emoji
        </Button>;

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Card>
          <CardContent>
            <Typography variant="title">Add Today's Emoji</Typography>
            <Typography variant="subheading">Add your emoji of the day by selecting from the emoji picker below</Typography>
            {selectedEmoji}
            {selectEmoji}
          </CardContent>
          <CardActions>
            <Button type="submit" size="small">Submit</Button>
          </CardActions>
        </Card>
      </form>
    )
  }
}
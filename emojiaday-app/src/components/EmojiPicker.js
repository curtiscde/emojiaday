import React, { Component } from 'react';
import { Picker } from 'emoji-mart'

export default class EmojiPicker extends Component{

  constructor(props){
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(data){
    const emojiId = data.id;
    this.props.onSelect(emojiId);
  }

  render(){
    return (
      <Picker
        emoji='grinning'
        set='twitter'
        title='Pick your emoji…'
        onSelect={this.handleSelect}
      />
    )
  }
}
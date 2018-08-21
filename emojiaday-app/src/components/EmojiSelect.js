import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Emoji } from 'emoji-mart'
import moment from 'moment';
import { connect } from "react-redux"
import * as userEntries from '../actions/userEntriesActions';

class EmojiSelect extends Component{

  state = {
    dialogOpen: false,
  };

  constructor(props){
    super(props);

    this.isToday = (this.props.day === moment().format('YYYYMMDD'));
  
    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEmojiSelect = this.handleEmojiSelect.bind(this);
  }

  handleIconClick(){
    this.props.onClick(this.props.day, this.props.index, this.props.entry);
    // if (this.isToday){
    //   this.setState({
    //     ...this.state,
    //     dialogOpen: true,
    //   });
    // }
  }

  handleCloseDialog(){
    this.setState({
      ...this.state,
      dialogOpen: false,
    });
  }

  handleEmojiSelect(emojiId){

    this.setState({
      ...this.state,
      dialogOpen: false,
    });

    if (this.props.entry){
      this.props.dispatch(userEntries.updateUserEntry(this.props.entry, emojiId));
    }
    else{
      this.props.dispatch(userEntries.addUserEntry(emojiId, this.props.index, moment().format('YYYYMMDD')));
    }
  }

  render(){
    return (
      <Grid item xs={4} style={{ textAlign: 'center' }}>
        <IconButton onClick={this.handleIconClick}>
          {
            this.props.entry && this.props.entry.requestPending ? <CircularProgress size={32} />
            : this.props.entry ? <Emoji emoji={this.props.entry.emoji} set='twitter' size={32} />
            : this.isToday ? <AddCircleOutlined style={{ fontSize: 40 }}/>
            : null
          }
        </IconButton>
      </Grid>
    )
  }
}

export default connect()(EmojiSelect);
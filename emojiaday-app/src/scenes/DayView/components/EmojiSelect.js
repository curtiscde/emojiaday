import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { Picker, Emoji } from 'emoji-mart'
import Button from '@material-ui/core/Button';
import Config from '../../../config';
import axios from 'axios';
import moment from 'moment';
import ReactGA from 'react-ga';

export default class DayView extends Component{

  state = {
    dialogOpen: false,
    emoji: null,
    entryId: null,
    iconRequest: false
  };

  constructor(props){
    super(props);

    this.isToday = (this.props.day === moment().format('YYYYMMDD'));
  
    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEmojiSelect = this.handleEmojiSelect.bind(this);
  }

  componentDidMount(){
    this.getEntry();
  }

  getEntry(){

    this.setState({
      ...this.state,
      iconRequest: true
    });

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    axios.get(`${Config.serviceUri}/api/entry/user/${this.props.day}/${this.props.index}`).then(res => {
      this.setState({
        ...this.state,
        emoji: res.data.entry ? res.data.entry.emoji : null,
        entryId: res.data.entry ? res.data.entry._id : null,
        iconRequest: false
      });
    }).catch(err => {
      this.setState({
        ...this.state,
        iconRequest: false
      });
    });
  }

  handleIconClick(){

    if (this.isToday){
      this.setState({
        ...this.state,
        dialogOpen: true,
      });
    }
  }

  handleCloseDialog(){
    this.setState({
      ...this.state,
      dialogOpen: false,
    });
  }

  handleEmojiSelect(data){
    
    const emojiId = data.id;

    this.setState({
      ...this.state,
      dialogOpen: false,
      iconRequest: true
    });

    if (this.state.entryId){

      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
      axios.put(`${Config.serviceUri}/api/entry/day`, {
        entryid: this.state.entryId,
        emoji: emojiId,
      }).then(res => {
        this.setState({
          ...this.state,
          emoji: res.data.emoji,
          iconRequest: false
        });
        ReactGA.event({
          category: 'Emoji Entry',
          action: 'Update',
          label: emojiId
        });
      }).catch(error => {
        this.setState({
          ...this.state,
          iconRequest: false
        });
        ReactGA.event({
          category: 'Error',
          action: 'Emoji Entry Update'
        });
      });

    }
    else{

      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
      axios.post(`${Config.serviceUri}/api/entry/day`, {
        emoji: emojiId,
        index: this.props.index
      }).then(res => {
        this.setState({
          ...this.state,
          emoji: res.data.emoji,
          entryId: res.data._id,
          iconRequest: false
        });

        ReactGA.event({
          category: 'Emoji Entry',
          action: 'Add',
          label: emojiId
        });
      }).catch(error => {
        this.setState({
          ...this.state,
          iconRequest: false
        });
        ReactGA.event({
          category: 'Error',
          action: 'Emoji Entry Add'
        });
      });

    }


  }

  render(){
    return (
      <Grid item xs={4} style={{ textAlign: 'center' }}>
        <IconButton onClick={this.handleIconClick}>
          {
            this.state.iconRequest ? <CircularProgress size={32} />
            : this.state.emoji ? <Emoji emoji={this.state.emoji} set='twitter' size={32} />
            : this.isToday ? <AddCircleOutlined style={{ fontSize: 40 }}/>
            : null
          }
        </IconButton>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleCloseDialog}>
          <Picker
            emoji='grinning'
            set='twitter'
            title='Pick your emoji…'
            onSelect={this.handleEmojiSelect}
          />
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    )
  }
}
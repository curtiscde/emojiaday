import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { Picker, Emoji } from 'emoji-mart'
import Button from '@material-ui/core/Button';

export default class DayView extends Component{

  state = {
    dialogOpen: false,
    iconRequest: false
  };

  constructor(props){
    super(props);
    console.log(props.index);
    this.index = props.index;
  
    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEmojiSelect = this.handleEmojiSelect.bind(this);
  }

  handleIconClick(){
    this.setState({
      ...this.state,
      dialogOpen: true,
    });
  }

  handleCloseDialog(){
    this.setState({
      ...this.state,
      dialogOpen: false,
    });
  }

  handleEmojiSelect(){
    this.setState({
      ...this.state,
      dialogOpen: false,
      iconRequest: true
    });
  }

  render(){
    return (
      <Grid item xs={4} style={{ textAlign: 'center' }}>
        <IconButton onClick={this.handleIconClick}>
          {
            this.state.iconRequest
            ? <CircularProgress size={32} />
            : <AddCircleOutlined style={{ fontSize: 40 }}/>
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
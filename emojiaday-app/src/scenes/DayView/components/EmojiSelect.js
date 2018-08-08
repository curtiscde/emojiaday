import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { Picker, Emoji } from 'emoji-mart'

export default class DayView extends Component{

  state = {
    dialogOpen: false,
  };

  constructor(props){
    super(props);
    console.log(props.index);
    this.index = props.index;
  
    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleIconClick(){
    this.setState({
      dialogOpen: true,
    });
  }

  handleCloseDialog(){
    this.setState({
      dialogOpen: false,
    });
  }

  render(){
    return (
      <Grid item xs={4} style={{ textAlign: 'center' }}>
        <IconButton onClick={this.handleIconClick}>
          <AddCircleOutlined style={{ fontSize: 40 }}/>
        </IconButton>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleCloseDialog}>
          <Picker/>
        </Dialog>
      </Grid>
    )
  }
}
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EmojiSelect from './EmojiSelect';

export default class DayView extends Component{
  render(){
    return (
      <Paper>
        <Grid container spacing={24}>
          <EmojiSelect day={this.props.day} index={0} />
          <EmojiSelect day={this.props.day} index={1} />
          <EmojiSelect day={this.props.day} index={2} />
        </Grid>
      </Paper>
    )
  }
}
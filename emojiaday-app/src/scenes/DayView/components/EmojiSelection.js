import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EmojiSelect from './EmojiSelect';

export default class DayView extends Component{
  render(){
    return (
      <Paper>
        <Grid container spacing={24}>
          <EmojiSelect index={0} />
          <EmojiSelect index={1} />
          <EmojiSelect index={2} />
        </Grid>
      </Paper>
    )
  }
}
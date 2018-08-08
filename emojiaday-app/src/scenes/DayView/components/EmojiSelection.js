import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';

export default class DayView extends Component{
  render(){
    return (
      <Paper>
        <Grid container spacing={24}>
          <Grid item xs={4} style={{ textAlign: 'center' }}>
            <IconButton>
              <AddCircleOutlined style={{ fontSize: 40 }}/>
            </IconButton>
          </Grid>
          <Grid item xs={4}>
df
          </Grid>
          <Grid item xs={4}>
sd
          </Grid>
        </Grid>
      </Paper>
    )
  }
}
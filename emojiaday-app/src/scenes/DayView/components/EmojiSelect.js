import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';

export default class DayView extends Component{

  constructor(props){
    super(props);
    console.log(props.index);
    this.index = props.index;
  
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  handleIconClick(){
    console.log(this.index);
  }

  render(){
    return (
      <Grid item xs={4} style={{ textAlign: 'center' }}>
        <IconButton onClick={this.handleIconClick}>
          <AddCircleOutlined style={{ fontSize: 40 }}/>
        </IconButton>
      </Grid>
    )
  }
}
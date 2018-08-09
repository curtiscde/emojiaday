import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import EmojiSelect from './EmojiSelect';

export default class DayView extends Component{
  render(){
    return (
      <Card>
        <CardContent>
          <Grid container spacing={24}>
            <EmojiSelect day={this.props.day} index={0} />
            <EmojiSelect day={this.props.day} index={1} />
            <EmojiSelect day={this.props.day} index={2} />
          </Grid>
        </CardContent>
      </Card>
    )
  }
}
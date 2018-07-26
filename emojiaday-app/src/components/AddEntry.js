import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

export default class AddEntry extends Component {
  render(){
    return (
      <Card>
        <CardContent>
          <Typography variant="title">Add Entry</Typography>
          <Typography variant="subheading">Add your emoji of the day by selecting from the emoji picker below</Typography>
          <Picker/>
        </CardContent>
        <CardActions>
          <Button size="small">Submit</Button>
        </CardActions>
      </Card>
    )
  }
}
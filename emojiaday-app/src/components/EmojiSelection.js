import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EmojiSelect from './EmojiSelect';
import moment from 'moment';

export default class DayView extends Component{

  constructor(props){
    super();
  }

  isToday(){
    return (this.props.day === moment().format('YYYYMMDD'));
  }

  render(){
    return (
      <Card>
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={12}>
                <Typography variant="subheading" color="inherit">
                    {
                      this.isToday() ?
                        'Your emojis Today'
                        : `Your emojis for ${moment(this.props.day).format('D MMMM YYYY')}` 
                    }
                </Typography>
            </Grid>
            <EmojiSelect day={this.props.day} index={0} />
            <EmojiSelect day={this.props.day} index={1} />
            <EmojiSelect day={this.props.day} index={2} />
          </Grid>
        </CardContent>
      </Card>
    )
  }
}
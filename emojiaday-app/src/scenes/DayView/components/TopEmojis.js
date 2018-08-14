import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import EmojiBadge from '../../../components/EmojiBadge';

export default class TopEmojis extends Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant="subheading" color="inherit">
                Top emojis for {moment(this.props.day).format('D MMMM YYYY')}
              </Typography>
            </Grid>
            {this.props.data.map((topEmoji, index) => (
              <Grid item xs={4} style={{ textAlign: 'center', paddingTop: 12 }} key={index}>
                <EmojiBadge emoji={topEmoji} index={index} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
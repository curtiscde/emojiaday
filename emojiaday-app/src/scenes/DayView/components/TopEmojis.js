import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { Emoji } from 'emoji-mart';
import moment from 'moment';

export default class TopEmojis extends Component {
  render() {
    const styles = {
      badge: {
        top: 1,
        right: -15,
        border: '2px solid #ccc',
      },
    };

    const getBackgroundColor = index => {
      return index === 0  ? 'rgba(255, 215, 0, 0.3)'
          : index === 1 ? 'rgba(211, 211, 211, 0.3)'
          : index === 2 ? 'rgba(205, 127, 50, 0.3)'
          : '';
    }

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
                <IconButton key={topEmoji._id} style={{ backgroundColor: getBackgroundColor(index) }}>
                  {
                    topEmoji.count > 10
                      ? (
                        <Badge badgeContent={topEmoji.count} color="primary" classes={{ badge: styles.badge }}>
                          <Emoji emoji={topEmoji._id} set="twitter" size={32} />
                        </Badge>
                      )
                      : (
                        <Emoji emoji={topEmoji._id} set="twitter" size={32} />
                      )
                  }
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
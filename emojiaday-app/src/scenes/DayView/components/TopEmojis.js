import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { Emoji } from 'emoji-mart';
import moment from 'moment';

export default class TopEmojis extends Component{
    render(){

        const styles = {
            paper: {
              padding: 2,
              textAlign: 'center',
            },
            badge: {
              top: 1,
              right: -15,
              border: `2px solid #ccc`,
            },
          };

        return (
            <Paper className={styles.paper}>
                <Typography variant="subheading" color="inherit">
                    Top emojis for {moment(this.props.day).format('D MMMM YYYY')}
                </Typography>
                {this.props.data.map(topEmoji => (
                    <IconButton key={topEmoji._id}>
                    <Badge badgeContent={topEmoji.count} color="primary" classes={{ badge: styles.badge }}>
                        <Emoji emoji={topEmoji._id} set='twitter' size={32} />
                    </Badge>
                    </IconButton>
                ))}
            </Paper>
        );
    }
}
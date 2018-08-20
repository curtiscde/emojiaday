import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { connect } from 'react-redux';
import EmojiSelect from './EmojiSelect';
import * as userEntries from '../actions/userEntriesActions';

class EmojiSelection extends Component {

  componentDidMount() {
    if (!this.props.userEntries.fetching && !this.props.userEntries.fetched) {
      this.props.dispatch(userEntries.fetchUserEntries());
    }
  }

  isToday() {
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
            <EmojiSelect day={this.props.day} index={0} entry={this.props.userEntries
                                                            && this.props.userEntries.entries
                                                            && this.props.userEntries.entries[this.props.day]
                                                            && this.props.userEntries.entries[this.props.day][0]} />
            <EmojiSelect day={this.props.day} index={1} entry={this.props.userEntries
                                                            && this.props.userEntries.entries
                                                            && this.props.userEntries.entries[this.props.day]
                                                            && this.props.userEntries.entries[this.props.day][1]} />
            <EmojiSelect day={this.props.day} index={2} entry={this.props.userEntries
                                                            && this.props.userEntries.entries
                                                            && this.props.userEntries.entries[this.props.day]
                                                            && this.props.userEntries.entries[this.props.day][2]} />
          </Grid>
        </CardContent>
      </Card>
    )
  }
}

export default connect((store) => {
  return {
    userEntries: store.userEntries,
  };
})(EmojiSelection);
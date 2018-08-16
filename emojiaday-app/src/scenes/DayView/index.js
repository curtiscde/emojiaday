import React, { Component } from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import EmojiSelection from '../../components/EmojiSelection';
import TopEmojis from './components/TopEmojis';
import * as dayEntries from '../../actions/dayEntriesActions';
import Loading from '../../components/Loading';

class DayView extends Component {
  componentDidMount() {
    this.props.dispatch(dayEntries.fetchDayEntries(this.props.match.params.day));
  }

  render() {
    const styles = {
      root: {
        flexGrow: 1,
      },
    };

    const topEmojis = this.props.dayEntries[this.props.match.params.day] && this.props.dayEntries[this.props.match.params.day].topEmojis.length ?
      <Grid item xs={12}>
        <TopEmojis day={this.props.match.params.day} data={this.props.dayEntries[this.props.match.params.day].topEmojis}/>
      </Grid>
    : null;

    const view = this.props.dayEntries[this.props.match.params.day] && this.props.dayEntries[this.props.match.params.day].fetched ?
      <div>
        <EmojiSelection day={this.props.match.params.day}/>
        {topEmojis}
      </div>:
      <Loading/>

    return (
      <div className={styles.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              {moment(this.props.match.params.day).format('D MMMM YYYY')}
            </Typography>
          </Toolbar>
        </AppBar>
        {view}
      </div>
    )
  }
}

DayView = connect((store) => {
  return {
    dayEntries: store.dayEntries.days,
  };
})(DayView);

export default DayView;
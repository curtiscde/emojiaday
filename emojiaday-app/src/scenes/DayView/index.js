import React, { Component } from 'react';
import axios from 'axios';
import Config from '../../config';
import moment from 'moment';
import Loading from '../../components/Loading';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import EmojiSelection from '../../components/EmojiSelection';
import TopEmojis from './components/TopEmojis';
import * as dayEntries from '../../actions/dayEntriesActions';

class DayView extends Component {
  constructor() {
    super();
    this.state = {
      dayData: null,
      dayDataLoaded: false,
      userEmojiId: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(dayEntries.fetchDayEntries(this.props.match.params.day));
  }

  render() {
    const styles = {
      root: {
        flexGrow: 1,
      },
    };

    // const topEmojis = this.state.dayData && this.state.dayData.topEmojis.length ?
    //   <Grid item xs={12}>
    //     <TopEmojis day={this.props.match.params.day} data={this.state.dayData.topEmojis}/>
    //   </Grid>
    // : null;

    const topEmojis = this.props.dayEntries && this.props.dayEntries.days[this.props.match.params.day] && this.props.dayEntries.days[this.props.match.params.day].topEmojis.length ?
      <Grid item xs={12}>
        <TopEmojis day={this.props.match.params.day} data={this.props.dayEntries.days[this.props.match.params.day].topEmojis}/>
      </Grid>
    : null;

    const view = this.props.dayEntries.days[this.props.match.params.day] && this.props.dayEntries.days[this.props.match.params.day].fetched ?
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
    dayEntries: store.dayEntries,
  };
})(DayView);

export default DayView;
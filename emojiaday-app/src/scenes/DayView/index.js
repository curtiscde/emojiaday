import React, { Component } from 'react';
import axios from 'axios';
import Config from '../../config';
import moment from 'moment';
import Loading from '../../components/Loading';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import EmojiSelection from '../../components/EmojiSelection';
import TopEmojis from './components/TopEmojis';


export default class DayView extends Component {
  constructor() {
    super();
    this.state = {
      dayData: null,
      dayDataLoaded: false,
      userEmojiId: null,
    };
  }

  componentDidMount(){
    
    this.getData();
  }

  getData(){
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
      axios.get(`${Config.serviceUri}/api/entries/day/${this.props.match.params.day}`)
          .then(res => {
              this.setState({
                ...this.state,
                dayData: res.data,
                dayDataLoaded: true,
              });
          })
          .catch(function (error) {
            console.log(error);
            this.setState({
              ...this.state,
              dayDataLoaded: true
            });
          });
  }

  render() {
    const styles = {
      root: {
        flexGrow: 1,
      },
    };

    const topEmojis = this.state.dayData && this.state.dayData.topEmojis.length ?
      <Grid item xs={12}>
        <TopEmojis day={this.props.match.params.day} data={this.state.dayData.topEmojis}/>
      </Grid>
    : null;

    const view = this.state.dayDataLoaded ?
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
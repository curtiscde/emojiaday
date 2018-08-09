import React, { Component } from 'react';
import axios from 'axios';
import Config from '../../config';
import moment from 'moment';
import Loading from '../../components/Loading';
import Typography from '@material-ui/core/Typography';
import { Emoji } from 'emoji-mart';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import EmojiSelection from './components/EmojiSelection';


export default class DayView extends Component{

  constructor(){
    super();
    this.state = {
      dayData: null,
      dayDataLoaded: false,
      userEmojiId: null
    }
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

  render(){

    const styles = {
      root: {
        flexGrow: 1,
      },
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

    const topEmojis = this.state.dayData && this.state.dayData.topEmojis.length ?
      <Grid item xs={12}>
        <Paper className={styles.paper}>
          <Typography variant="subheading" color="inherit">
            Top emojis for {moment(this.props.match.params.day).format('D MMMM YYYY')}
          </Typography>
          {this.state.dayData.topEmojis.map(topEmoji => (
            <IconButton key={topEmoji._id}>
              <Badge badgeContent={topEmoji.count} color="primary" classes={{ badge: styles.badge }}>
                <Emoji emoji={topEmoji._id} set='twitter' size={32} />
              </Badge>
            </IconButton>
          ))}
        </Paper>
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
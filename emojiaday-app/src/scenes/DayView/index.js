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


export default class DayView extends Component{

  constructor(){
    super();
    this.state = {
      dataLoaded: false,
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
                data: res.data,
                dataLoaded: true,
              });
          })
          .catch(function (error) {
            console.log(error);
            this.setState({
              ...this.state,
              dataLoaded: true
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

    const userEmoji = this.state.data && this.state.data.userEntries.length ?
      <Grid item xs={12}>
        <Paper className={styles.paper}>
          <Emoji emoji={this.state.data.userEntries[0].emoji} set='twitter' size={64} />
        </Paper>
      </Grid>
      : null;

    const topEmojis = this.state.data && this.state.data.topEmojis.length ?
      <Grid item xs={12}>
        <Paper className={styles.paper}>
          <Typography variant="subheading" color="inherit">
            Top emojis worldwide
          </Typography>
          {this.state.data.topEmojis.map(topEmoji => (
            <IconButton key={topEmoji._id}>
              <Badge badgeContent={topEmoji.count} color="primary" classes={{ badge: styles.badge }}>
                <Emoji emoji={topEmoji._id} set='twitter' size={32} />
              </Badge>
            </IconButton>
          ))}
        </Paper>
      </Grid>
    : null;

    const view = this.state.dataLoaded ?
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              {moment(this.props.match.params.day).format('D MMMM YYYY')}
            </Typography>
          </Toolbar>
        </AppBar>
        {userEmoji}
        {topEmojis}
      </div>:
      <Loading/>

    return (
      <div className={styles.root}>
        {view}
      </div>
    )
  }
}
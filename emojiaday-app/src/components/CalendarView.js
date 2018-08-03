import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import Config from '../config';
import { Emoji } from 'emoji-mart';
import './CalendarView.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from '../history';
import moment from 'moment';

export default class CalendarView extends Component {

  constructor(props){
    super(props);

    this.state = {
      entries: null,
      entriesLoaded: false
    };

    this.handleDayClick = this.handleDayClick.bind(this);
  }

  componentDidMount(){
    this.getEntries();
  }

  getEntries(){
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
      axios.get(`${Config.serviceUri}/api/entries/user`)
          .then(res => {
              this.setState({
                ...this.state,
                entries: res.data,
                entriesLoaded: true
              });
          })
          .catch(function (error) {
            console.log(error);
            this.setState({
              ...this.state,
              entriesLoaded: true
            });
          });
    }

    getEntryForDate(entries, date){
      return entries
      && entries.filter(entry => {
          const entryDate = new Date(entry.date);
          return entryDate.getDate() === date.getDate()
          && entryDate.getMonth() === date.getMonth()
          && entryDate.getFullYear() === date.getFullYear()
        });
    }

    handleDayClick(date){
      const dateFormatted = moment(date).format('YYYYMMDD');
      history.replace(`/date/${dateFormatted}`);
    }

    render(){

        const addTileContent = ({date, view}) => {
          const entry = this.getEntryForDate(this.state.entries, date);
          return view === 'month' && entry && entry.length ? <Emoji emoji={entry[0].emoji} set='twitter' size={16} /> : null
        };

        const view = this.state.entriesLoaded ?
          <Calendar
            tileContent={addTileContent}
            className={['calendar']}
            onClickDay={this.handleDayClick}
          /> :
          <div class={['loading']}>
            <CircularProgress size={80} />
          </div>

        return (
            <div>
              {view}
            </div>
        )
    }
}
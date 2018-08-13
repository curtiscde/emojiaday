import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import Config from '../../config';
import { Emoji } from 'emoji-mart';
import './styles.css';
import Loading from '../../components/Loading';
import history from '../../history';
import moment from 'moment';
import EmojiSelection from '../../components/EmojiSelection';

import * as userEntries from '../../actions/userEntriesActions';

export default class CalendarView extends Component {

  constructor(props){
    super(props);

    this.state = {
      entries: null,
      entriesLoaded: false
    };

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleEmojiSelectionUpdate = this.handleEmojiSelectionUpdate.bind(this);
  }

  componentDidMount(){
    userEntries.fetchUserEntries();
    this.getEntries();
  }

  getEntries(){
    console.log('getE');
    let self = this;
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    axios.get(`${Config.serviceUri}/api/entries/user`)
        .then(res => {
          self.setState({
              ...self.state,
              entries: res.data,
              entriesLoaded: true
            });
        })
        .catch(error => {
          console.log(error);
          self.setState({
            ...self.state,
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
      if (moment(date) <= moment()){
        history.replace(`/day/${dateFormatted}`);
      }
    }

    handleEmojiSelectionUpdate(){
      this.getEntries();
    }

    render(){

        const addTileContent = ({date, view}) => {
          const entry = this.getEntryForDate(this.state.entries, date);
          return view === 'month' && entry && entry.length ? <Emoji emoji={entry[0].emoji} set='twitter' size={20} /> : null
        };

        return (
            <div>
              {
                this.state.entriesLoaded ?
                <div>
                  <Calendar
                    tileContent={addTileContent}
                    className={['calendar']}
                    onClickDay={this.handleDayClick}
                  />
                  <EmojiSelection
                    day={moment().format('YYYYMMDD')}
                    onUpdate={this.handleEmojiSelectionUpdate}
                  />
                </div> :
                <Loading/>
              }
            </div>
        )
    }
}
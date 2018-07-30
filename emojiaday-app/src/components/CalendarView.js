import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import Config from '../config';
import { Emoji } from 'emoji-mart'

export default class CalendarView extends Component {

  constructor(props){
    super(props);

    this.state = {
      entries: null
    };
  }

    getEntries(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        axios.get(`${Config.serviceUri}/api/entries/user`)
            .then(res => {
                this.setState({
                  entries: res.data
                });
            })
            .catch(function (error) {
              console.log(error);
            });
    }

    getEntryForDate(entries, date){
      return entries
        && entries.filter(entry =>
          new Date(entry.date).getDate() === date.getDate()
          && new Date(entry.date).getMonth() === date.getMonth()
          && new Date(entry.date).getFullYear() === date.getFullYear()
        );
    }

    render(){

        this.getEntries();

        const addTileContent = ({date, view}) => {
          const entry = this.getEntryForDate(this.state.entries, date);
          return view === 'month' && entry && entry.length ? <Emoji emoji={entry[0].emoji} set='emojione' size={16} /> : null
        };

        return (
            <div>
              <Calendar tileContent={addTileContent}/>
            </div>
        )
    }
}
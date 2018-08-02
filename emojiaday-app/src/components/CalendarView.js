import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import Config from '../config';
import { Emoji } from 'emoji-mart';
import './CalendarView.css';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class CalendarView extends Component {

  constructor(props){
    super(props);

    this.state = {
      entries: null,
      entriesLoaded: false
    };
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
                  entriesLoaded: false
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

    render(){

        const addTileContent = ({date, view}) => {
          const entry = this.getEntryForDate(this.state.entries, date);
          return view === 'month' && entry && entry.length ? <Emoji emoji={entry[0].emoji} set='twitter' size={16} /> : null
        };

        const view = this.state.entriesLoaded ?
          <Calendar tileContent={addTileContent} className={['calendar']}/> :
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
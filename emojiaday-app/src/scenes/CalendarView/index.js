import React, { Component } from 'react';
import Calendar from 'react-calendar';
import { Emoji } from 'emoji-mart';
import './styles.css';
import { connect } from 'react-redux';
import moment from 'moment';
import Loading from '../../components/Loading';
import history from '../../history';

import EmojiSelection from '../../components/EmojiSelection';


import * as userEntries from '../../actions/userEntriesActions';

class CalendarView extends Component {
  componentDidMount() {
    this.props.dispatch(userEntries.fetchUserEntries());
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

    render(){

        const addTileContent = ({date, view}) => {
          const entry = this.getEntryForDate(this.props.userEntriesDay.entries, date);
          return view === 'month' && entry && entry.length ? <Emoji emoji={entry[0].emoji} set='twitter' size={20} /> : null
        };

        return (
            <div>
              {
                this.props.userEntriesDay.fetched ?
                <div>
                  <Calendar
                    tileContent={addTileContent}
                    className={['calendar']}
                    onClickDay={this.handleDayClick.bind(this)}
                  />
                  <EmojiSelection
                    day={moment().format('YYYYMMDD')}
                  />
                </div> :
                <Loading/>
              }
            </div>
        )
    }
}

CalendarView = connect((store) => {
  return {
    userEntriesDay: store.userEntriesDay,
  };
})(CalendarView);

export default CalendarView;

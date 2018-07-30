import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import Config from '../config';

export default class CalendarView extends Component {

    getEntries(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        axios.get(`${Config.serviceUri}/api/entries/user`)
            .then(res => {
                console.log(res);
            })
            .catch(function (error) {
              console.log(error);
            });
    }

    render(){

        this.getEntries();

        const addTileContent = ({date, view}) => {
          return view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null
        };

        return (
            <div>
              <Calendar tileContent={addTileContent}/>
            </div>
        )
    }
}
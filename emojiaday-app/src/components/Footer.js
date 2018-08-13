import React, { Component } from 'react';
import './Footer.css';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TodayIcon from '@material-ui/icons/Today';
import history from '../history';
import moment from 'moment';

export default class Footer extends Component {
    handleChange(e, value){
        switch(value){
            case 'calendar':{
                history.replace('/');
                break;
            }
            case 'today':{
                history.replace(`/day/${moment().format('YYYYMMDD')}`);
                break;
            }
            default:{
                console.log(`Missing action for ${value}`);
            }
        }
    }
    
    render() {
        return (
            this.props.isAuthenticated() ?
            <footer>
                <BottomNavigation
                    onChange={this.handleChange}
                    showLabels
                >
                    <BottomNavigationAction label="Calendar" value="calendar" icon={<CalendarTodayIcon />} />
                    <BottomNavigationAction label="Today" value="today" icon={<TodayIcon />} />
                </BottomNavigation>
            </footer>
            : null
        )
    }
}
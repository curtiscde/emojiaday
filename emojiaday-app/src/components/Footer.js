import React, { Component } from 'react';
import './Footer.css';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import history from '../history';

export default class Footer extends Component {
    
    handleChange(e, value){
        switch(value){
            case 'calendar':{
                history.replace('/');
                break;
            }
            case 'addentry':{
                history.replace('/addentry');
                break;
            }
            default:{
                console.log(`Missing action for ${value}`);
            }
        }
    }
    
    render(){
        return (
            this.props.isAuthenticated() ?
            <footer>
                <BottomNavigation
                    onChange={this.handleChange}
                    showLabels
                >
                    <BottomNavigationAction label="Calendar" value="calendar" icon={<CalendarTodayIcon />} />
                    <BottomNavigationAction label="Add Entry" value="addentry" icon={<AddIcon />} />
                </BottomNavigation>
            </footer>
            : null
        )
    }
}
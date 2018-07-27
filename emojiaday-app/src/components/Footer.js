import React, { Component } from 'react';
import './Footer.css';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import history from '../history';

export default class Footer extends Component {
    
    handleChange(e, value){
        switch(value){
            case 'list':{
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
                    <BottomNavigationAction label="List" value="list" icon={<ListIcon />} />
                    <BottomNavigationAction label="Add Entry" value="addentry" icon={<AddIcon />} />
                </BottomNavigation>
            </footer>
            : null
        )
    }
}
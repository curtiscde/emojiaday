import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Login from './Login';
import Logout from './Logout';
import NavProfile from './NavProfile';

export default class NavBar extends Component {
  render(){

    const authButton = this.props.isAuthenticated() ? <NavProfile/> : <Login/>;

    return (
      <div style={{flexGrow:1}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" style={{flexGrow:1}}>
              Emojiaday
            </Typography>
            {authButton}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
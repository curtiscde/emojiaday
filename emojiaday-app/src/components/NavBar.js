import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from "@material-ui/icons/Menu";
import Login from './Login';
import Logout from './Logout';

export default class NavBar extends Component {
  render(){

    const authButton = this.props.isAuthenticated() ? <Logout/> : <Login/>;

    return (
      <div style={{flexGrow:1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton style={{marginLeft: -12, marginRight: 20}} color="inherit" aria-label="Menu">
              <MenuIcon/>
            </IconButton>
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
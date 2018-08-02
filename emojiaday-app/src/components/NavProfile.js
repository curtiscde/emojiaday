import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Auth from '../auth/Auth';

export default class NavProfile extends Component {

    state = {
        anchorEl: null,
        menuOpen: false
    }

    auth = new Auth();

    handleMenu = event => {
        this.setState({
            ...this.state,
            anchorEl: event.currentTarget,
            menuOpen: true
        });
    };

    handleMenuClose = event => {
        this.setState({
            ...this.state,
            menuOpen: false
        });
    }

    handleLogout = () => {
        this.auth.logout();
        this.setState({
            ...this.state,
            menuOpen: false
        });
    }

    render(){
        return (
            <div>
                <IconButton
                  aria-owns={this.state.menuOpen ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={this.state.menuOpen}
                  onClose={this.handleMenuClose}
                >
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
        )
    }
}
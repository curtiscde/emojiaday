import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Auth from './auth/Auth';
import NavBar from './components/NavBar';



class App extends Component {
  render() {

    const auth = new Auth();

    const openAuth0 = () => {
      auth.login();
    };

    return (
      <div>
        <NavBar/>
        <Button color="primary" onClick={openAuth0}>
          Login
        </Button>
      </div>
    );
  }
}

export default App;

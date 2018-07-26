import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Login from './components/Login';

class App extends Component {
  render() {

    return (
      <div>
        <NavBar/>
        <Login/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';

class App extends Component {
  render() {

    return (
      <div>
        <NavBar/>
        <BrowserRouter>
          <Route exact path="/" render={() => (<Login/>)} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

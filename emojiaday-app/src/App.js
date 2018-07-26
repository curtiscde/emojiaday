import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import AuthCallback from './components/AuthCallback';

class App extends Component {
  render() {

    return (
      <div>
        <NavBar/>
        <BrowserRouter>
          <div>
            <Route exact path="/" render={() => (<Login/>)} />
            <Route exact path="/callback" render={() => (<AuthCallback/>)} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

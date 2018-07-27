import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Auth from './auth/Auth';
import history from './history';
import NavBar from './components/NavBar';
import List from './components/List';
import AddEntry from './components/AddEntry';
import AuthCallback from './components/AuthCallback';
import Footer from './components/Footer';
import './App.css';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}
class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <NavBar isAuthenticated={auth.isAuthenticated}/>
            <Route exact path="/" render={() => {
              if (auth.isAuthenticated()){
                return <List/>;
              }
              else{
                return <p>Logged Out</p>;
              }
            }} />
            <Route exact path="/callback" render={(props) => {
                handleAuthentication(props);
                return <AuthCallback auth={auth}/>;
              }}
            />
            <Route exact path="/addentry" component={AddEntry} />
            <Footer isAuthenticated={auth.isAuthenticated} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

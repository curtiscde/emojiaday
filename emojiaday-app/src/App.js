import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Auth from './auth/Auth';
import NavBar from './components/NavBar';
import AuthCallback from './components/AuthCallback';
import history from './history';

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
                return <p>Logged In!</p>;
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
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

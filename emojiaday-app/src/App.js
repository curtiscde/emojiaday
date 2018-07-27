import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Auth from './auth/Auth';
import history from './history';
import NavBar from './components/NavBar';
import AddEntry from './components/AddEntry';
import AuthCallback from './components/AuthCallback';
import Footer from './components/Footer';

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
                return <AddEntry/>;
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
            <Footer/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

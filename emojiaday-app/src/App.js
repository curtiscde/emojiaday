import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Auth from './auth/Auth';
import history from './history';
import NavBar from './components/NavBar';
import CalendarView from './components/CalendarView';
import AddEntry from './components/AddEntry';
import AuthCallback from './components/AuthCallback';
import Footer from './components/Footer';
import './App.css';
import ReactGA from 'react-ga';
import config from './config';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {

  constructor(){
    super();
    ReactGA.initialize(config.googleAnalytics.trackingId);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <NavBar isAuthenticated={auth.isAuthenticated}/>
            <Grid container class={['grid-container']} spacing={16}>
              <Route exact path="/" render={() => {
                if (auth.isAuthenticated()){
                  return <CalendarView/>;
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
            </Grid>
            <Footer isAuthenticated={auth.isAuthenticated} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import history from './history';
import NavBar from './components/NavBar';
import CalendarView from './scenes/CalendarView/index';
import DayView from './scenes/DayView/index';
import AuthCallback from './scenes/AuthCallback';
import Footer from './components/Footer';
import './App.css';
import config from './config';

class App extends Component {
  constructor() {
    super();
    ReactGA.initialize(config.googleAnalytics.trackingId, {
      debug: config.debug,
    });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    const { auth } = this.props;
    return (
      <div>
        <Router history={history}>
          <div>
            <NavBar isAuthenticated={auth.isAuthenticated}/>
            <Grid container class={['grid-container']} spacing={16}>
              <Route exact path="/" render={() => {
                if (auth.isAuthenticated){
                  return <CalendarView/>;
                }
                else{
                  return <div></div>;
                }
              }} />
              <Route exact path="/callback" component={AuthCallback} />
              <Route exact path="/day/:day" component={DayView} />
            </Grid>
            <Footer isAuthenticated={auth.isAuthenticated} />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    auth: store.auth,
  };
})(App);

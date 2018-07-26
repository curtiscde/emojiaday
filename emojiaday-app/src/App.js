import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from './auth/Auth';
import NavBar from './components/NavBar';
import Login from './components/Login';
import AuthCallback from './components/AuthCallback';

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
        <NavBar/>
        <BrowserRouter>
          <div>
            <Route exact path="/" render={() => (<Login auth={auth}/>)} />
            <Route exact path="/callback" render={(props) => {
                handleAuthentication(props);
                return <AuthCallback auth={auth}/>;
              }}
            />
            <Route exact path="/home" render={() => (<NavBar/>)} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

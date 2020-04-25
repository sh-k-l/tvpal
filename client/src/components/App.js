import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import setAuthToken from '../utils/setAuthToken';
import { handleGetUser, handleLogout } from '../actions/user';

import GoogleButton from './GoogleButton';
import TokenHandler from './misc/TokenHandler';

if (window.localStorage.token) {
  setAuthToken(window.localStorage.token);
}

// setAuthToken(
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYTAzMTExZDlmZjg2MzljY2E1Y2U4MCIsImlhdCI6MTU4NzU1NjYyNSwiZXhwIjoxNTg4MTYxNDI1fQ.hPHtahn_OqpPrkZCZG4gEvFrp9UHNqNGc9jzQbHf8dw  s'
// );

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetUser());
  }

  render() {
    return (
      <>
        <LoadingBar />
        <div className="App">
          <Router>
            <Switch>
              <Route path="/auth" component={TokenHandler} />
            </Switch>

            <GoogleButton />
            <a href="#" onClick={() => this.props.dispatch(handleLogout())}>
              Logout
            </a>
          </Router>
        </div>
      </>
    );
  }
}

export default connect()(App);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import setAuthToken from '../utils/setAuthToken';
import { handleGetUser } from '../actions/user';

import TokenHandler from './misc/TokenHandler';
import PrivateRoute from './misc/PrivateRoute';
import Rankings from './Rankings';
import Summary from './Summary';
import Calendar from './Calendar';
import Backlog from './Backlog';
import Settings from './Settings';
import Alert from './Alert';
import Welcome from './Welcome';
import ScrollUpButton from './ScrollUpButton';
import ModalHandler from './ModalHandler';
import User from './User';

if (window.localStorage.token) {
  setAuthToken(window.localStorage.token);
}

const App = ({ getUser }) => {
  useEffect(() => {
    getUser();
  }, []);

  // navigator.clipboard.writeText('poo poo');
  return (
    <>
      <LoadingBar className="loading-bar" />
      <Alert />
      <div className="App">
        <Router basename="/app">
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/u/:username" component={User} />
            <Route path="/auth" component={TokenHandler} />
            <PrivateRoute path="/backlog" component={Backlog} />
            <PrivateRoute path="/summary" component={Summary} />
            <PrivateRoute path="/calendar" component={Calendar} />
            <PrivateRoute path="/rankings" component={Rankings} />
            <PrivateRoute path="/settings" component={Settings} />
          </Switch>
        </Router>
      </div>
      <ScrollUpButton />
      <ModalHandler />
    </>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user !== null,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(handleGetUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

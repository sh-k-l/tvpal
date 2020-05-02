import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import setAuthToken from '../utils/setAuthToken';
import { handleGetUser } from '../actions/user';
import { handleToggleModal } from '../actions/modals';

import TokenHandler from './misc/TokenHandler';
import PrivateRoute from './misc/PrivateRoute';
import Rankings from './Rankings';
import Summary from './Summary';
import Calendar from './Calendar';
import Backlog from './Backlog';
import Settings from './Settings';
import Menu from './Menu';
import Welcome from './Welcome';
import ScrollUpButton from './ScrollUpButton';
import ModalHandler from './ModalHandler';

if (window.localStorage.token) {
  setAuthToken(window.localStorage.token);
}

const App = ({ getUser, authenticated, toggleShowAdder }) => {
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <LoadingBar className="loading-bar" />
      <div className="App">
        <Router>
          {authenticated ? <Menu toggleShowAdder={toggleShowAdder} /> : <Welcome />}

          <Switch>
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
  toggleShowAdder: () => dispatch(handleToggleModal('show-adder')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

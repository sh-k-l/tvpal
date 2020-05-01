import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import setAuthToken from '../utils/setAuthToken';
import { handleGetUser } from '../actions/user';

import TokenHandler from './misc/TokenHandler';
import PrivateRoute from './misc/PrivateRoute';
import Watchlist from './Watchlist';
import Summary from './Summary';
import Calendar from './Calendar';
import Backlog from './Backlog';
import Settings from './Settings';
import Menu from './Menu';
import Welcome from './Welcome';
import ScrollUpButton from './ScrollUpButton';
import ShowAddingModal from './ShowAddingModal';

if (window.localStorage.token) {
  setAuthToken(window.localStorage.token);
}

// setAuthToken(
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYTAzMTExZDlmZjg2MzljY2E1Y2U4MCIsImlhdCI6MTU4NzU1NjYyNSwiZXhwIjoxNTg4MTYxNDI1fQ.hPHtahn_OqpPrkZCZG4gEvFrp9UHNqNGc9jzQbHf8dw  s'
// );

const App = ({ getUser, authenticated }) => {
  useEffect(() => {
    getUser();
  }, []);

  const [showAdderModal, setShowAdderModal] = useState(false);

  const toggleShowAdder = () => {
    setShowAdderModal(!showAdderModal);
  };

  return (
    <>
      <LoadingBar />
      <div className="App">
        <Router>
          {authenticated ? <Menu toggleShowAdder={() => toggleShowAdder()} /> : <Welcome />}

          <Switch>
            <Route path="/auth" component={TokenHandler} />
            <PrivateRoute path="/backlog" component={Backlog} />
            <PrivateRoute path="/summary" component={Summary} />
            <PrivateRoute path="/calendar" component={Calendar} />
            <PrivateRoute path="/watchlist" component={Watchlist} />
            <PrivateRoute path="/settings" component={Settings} />
          </Switch>
        </Router>
      </div>
      <ScrollUpButton />
      <ShowAddingModal isOpen={showAdderModal} toggleVisibleModal={() => toggleShowAdder()} />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(handleGetUser()),
});

const mapStateToProps = (state) => ({
  authenticated: state.user !== null,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

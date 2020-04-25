import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route {...rest} render={(props) => (!authenticated ? <Redirect to="/" /> : <Component {...props} />)} />
);

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated = state.user !== null
})

export default connect(mapStateToProps)(PrivateRoute);



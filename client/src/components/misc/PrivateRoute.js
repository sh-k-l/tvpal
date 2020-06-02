import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from '../Menu/Menu';
import { handleToggleModal } from '../../actions/modals';

const PrivateRoute = ({ component: Component, authenticated, toggleShowAdder, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !authenticated ? (
        <Redirect to="/" />
      ) : (
        <>
          <Menu toggleShowAdder={toggleShowAdder} />
          <Component {...props} />
        </>
      )
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user !== null,
});

const mapDispatchToProps = (dispatch) => ({
  toggleShowAdder: () => dispatch(handleToggleModal('show-adder')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);

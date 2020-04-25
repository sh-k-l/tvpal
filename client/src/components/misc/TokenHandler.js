import React from 'react';
import setAuthToken from '../../utils/setAuthToken';
import { Redirect } from 'react-router-dom';

const TokenHandler = (props) => {
  const { search } = props.location;
  const token = new URLSearchParams(search).get('token');
  console.log(token);
  setAuthToken(token);
  window.localStorage.setItem('token', token);

  return <Redirect to="/" />;
};

export default TokenHandler;

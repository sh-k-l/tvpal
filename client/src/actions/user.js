import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import setAuthToken from '../utils/setAuthToken';

export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const handleGetUser = () => async (dispatch) => {
  try {
    dispatch(showLoading());
    const { data: user } = await axios.get('/users/me');
    dispatch(setUser(user));
  } catch (error) {
    console.log(error);
    dispatch(handleLogout());
  } finally {
    dispatch(hideLoading());
  }
};

export const handleLogout = () => {
  window.localStorage.removeItem('token');
  setAuthToken();

  return {
    type: CLEAR_USER,
  };
};

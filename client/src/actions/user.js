import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import setAuthToken from '../utils/setAuthToken';
import { handleRequestEpisodes } from './episodes';
import { setAlert } from './alerts';

export const SET_SHOWS = 'SET_SHOWS';
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const ADD_USERNAME = 'ADD_USERNAME';

const setUser = (user) => ({
  type: SET_USER,
  user,
});

const setShows = (shows) => ({
  type: SET_SHOWS,
  shows,
});

export const handleGetUser = () => async (dispatch) => {
  try {
    dispatch(showLoading());
    const { data: user } = await axios.get('/api/users/me');
    dispatch(
      setUser({
        username: user.username,
        name: user.name,
        email: user.email,
      })
    );
    dispatch(setShows(user.shows));
    dispatch(setAlert(`Hi ${user.name.split(' ')[0]}! 👋`, 'success'));

    user.shows.forEach((show) => dispatch(handleRequestEpisodes(show.id)));
  } catch (error) {
    console.log(error);
    dispatch(handleLogout());
  } finally {
    dispatch(hideLoading());
  }
};

const addUsername = (username) => ({
  type: ADD_USERNAME,
  username,
});

export const handleAddUsername = (username) => async (dispatch) => {
  try {
    const body = JSON.stringify({ username: username });
    await axios.patch('/api/users/addusername', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch(addUsername(username));
  } catch (error) {
    if (error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'error'));
      });
    } else {
      dispatch(setAlert(error.response.data.msg, 'error'));
    }
  }
};

//TODO
export const handleDeleteUser = () => async (dispatch) => {};

export const handleLogout = () => {
  window.localStorage.removeItem('token');
  setAuthToken();

  return {
    type: CLEAR_USER,
  };
};

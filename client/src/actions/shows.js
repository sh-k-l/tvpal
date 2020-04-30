import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const ADD_SHOW = 'ADD_SHOW';
export const REORDER_SHOWS = 'REORDER_SHOWS';

const addShow = (show) => ({
  type: ADD_SHOW,
  show,
});

export const handleAddShow = (show) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const body = JSON.stringify({ shows: [show] });
    await axios.post('/shows', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(addShow(show));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(hideLoading());
  }
};

const reorderShows = (from, to) => ({
  type: REORDER_SHOWS,
  to,
  from,
});

export const handleReorderShows = (from, to) => async (dispatch, getState) => {
  try {
    const shows = getState().shows;
    const newShowOrder = shows.map((show) => show.id);

    dispatch(reorderShows(from, to));

    newShowOrder.splice(to, 0, newShowOrder.splice(from, 1)[0]);

    const body = JSON.stringify({ order: newShowOrder });
    await axios.patch('/shows', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
    dispatch(reorderShows(to, from));
  }
};

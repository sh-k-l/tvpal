import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { handleRequestEpisodes } from './episodes';

export const ADD_SHOW = 'ADD_SHOW';
export const REMOVE_SHOW = 'REMOVE_SHOW';
export const REORDER_SHOWS = 'REORDER_SHOWS';
export const EPISODE_SEEN = 'EPISODE_SEEN';
export const EPISODE_UNSEEN = 'EPISODE_UNSEEN';

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
    dispatch(addShow({ ...show, seenEpisodes: [] }));
    dispatch(handleRequestEpisodes(show.id));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(hideLoading());
  }
};

const removeShow = (show) => ({
  type: REMOVE_SHOW,
  show,
});

export const handleRemoveShow = (showId) => async (dispatch) => {
  try {
    dispatch(showLoading());
    await axios.delete(`shows/${showId}`);
    dispatch(removeShow(showId));
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

const episodeSeen = (showId, episodeId) => ({
  type: EPISODE_SEEN,
  show: showId,
  episode: episodeId,
});

const episodeUnseen = (showId, episodeId) => ({
  type: EPISODE_UNSEEN,
  show: showId,
  episode: episodeId,
});

export const handleToggleEpisodes = (showId, episodeId, as) => async (dispatch) => {
  try {
    if (as === 'seen') {
      dispatch(episodeSeen(showId, episodeId));
    } else if (as === 'unseen') {
      dispatch(episodeUnseen(showId, episodeId));
    } else {
      return;
    }

    const body = JSON.stringify({ episodeIds: [episodeId], markAs: as });
    await axios.patch(`/shows/${showId}/episodes`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
    if (as === 'seen') {
      dispatch(episodeUnseen(showId, episodeId));
    } else if (as === 'unseen') {
      dispatch(episodeSeen(showId, episodeId));
    }
  }
};

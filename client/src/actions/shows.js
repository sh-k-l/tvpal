import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { handleRequestEpisodes } from './episodes';

export const ADD_SHOW = 'ADD_SHOW';
export const REMOVE_SHOW = 'REMOVE_SHOW';
export const REORDER_SHOWS = 'REORDER_SHOWS';
export const EPISODES_SEEN = 'EPISODE_SEEN';
export const EPISODES_UNSEEN = 'EPISODE_UNSEEN';

const addShow = (show) => ({
  type: ADD_SHOW,
  show,
});

export const handleAddShow = (show) => async (dispatch) => {
  try {
    dispatch(showLoading());
    const body = JSON.stringify({ shows: [show] });
    await axios.post('/api/shows', body, {
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
    await axios.delete(`/api/shows/${showId}`);
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
    await axios.patch('/api/shows', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
    dispatch(reorderShows(to, from));
  }
};

const episodesSeen = (showId, episodeIds) => ({
  type: EPISODES_SEEN,
  show: showId,
  episodes: episodeIds,
});

const episodesUnseen = (showId, episodeIds) => ({
  type: EPISODES_UNSEEN,
  show: showId,
  episodes: episodeIds,
});

export const handleToggleEpisodes = (showId, episodeIds, as) => async (dispatch) => {
  try {
    if (episodeIds.length === 0) return;

    if (as === 'seen') {
      dispatch(episodesSeen(showId, episodeIds));
    } else if (as === 'unseen') {
      dispatch(episodesUnseen(showId, episodeIds));
    } else {
      return;
    }

    const body = JSON.stringify({ episodeIds, markAs: as });
    await axios.patch(`/api/shows/${showId}/episodes`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
    if (as === 'seen') {
      dispatch(episodesUnseen(showId, episodeIds));
    } else if (as === 'unseen') {
      dispatch(episodesSeen(showId, episodeIds));
    }
  }
};

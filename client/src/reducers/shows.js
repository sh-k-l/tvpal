import {
  ADD_SHOW,
  REMOVE_SHOW,
  REORDER_SHOWS,
  EPISODES_SEEN,
  EPISODES_UNSEEN,
} from '../actions/shows';
import { SET_SHOWS } from '../actions/user';

export default (state = null, action) => {
  switch (action.type) {
    case SET_SHOWS:
      return action.shows;
    case ADD_SHOW:
      return [...state, action.show];
    case REMOVE_SHOW: {
      const showIndex = state.findIndex((show) => show.id === action.show);
      const newShows = JSON.parse(JSON.stringify(state));
      if (showIndex !== -1) newShows.splice(showIndex, 1);
      return newShows;
    }
    case REORDER_SHOWS: {
      const newShows = JSON.parse(JSON.stringify(state));
      newShows.splice(action.to, 0, newShows.splice(action.from, 1)[0]);
      return newShows;
    }
    case EPISODES_SEEN: {
      const showIndex = state.findIndex((show) => show.id === action.show);
      const newShows = JSON.parse(JSON.stringify(state));
      newShows[showIndex].seenEpisodes.push(...action.episodes);
      return newShows;
    }
    case EPISODES_UNSEEN: {
      const showIndex = state.findIndex((show) => show.id === action.show);
      const newShows = JSON.parse(JSON.stringify(state));
      newShows[showIndex].seenEpisodes = newShows[showIndex].seenEpisodes.filter(
        (ep) => !action.episodes.includes(ep)
      );
      return newShows;
    }
    default:
      return state;
  }
};

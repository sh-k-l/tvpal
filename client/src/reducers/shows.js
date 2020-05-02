import { ADD_SHOW, REORDER_SHOWS, EPISODE_SEEN, EPISODE_UNSEEN } from '../actions/shows';
import { SET_SHOWS } from '../actions/user';

export default (state = null, action) => {
  switch (action.type) {
    case SET_SHOWS:
      return action.shows;
    case ADD_SHOW:
      return [...state, action.show];
    case REORDER_SHOWS: {
      const newShows = [...state];
      newShows.splice(action.to, 0, newShows.splice(action.from, 1)[0]);
      return newShows;
    }
    case EPISODE_SEEN: {
      const showIndex = state.findIndex((show) => show.id === action.show);
      const newShows = [...state];
      newShows[showIndex].seenEpisodes.push(action.episode);
      return newShows;
    }
    case EPISODE_UNSEEN: {
      const showIndex = state.findIndex((show) => show.id === action.show);
      const newShows = [...state];
      newShows[showIndex].seenEpisodes = newShows[showIndex].seenEpisodes.filter(
        (ep) => ep !== action.episode
      );
      return newShows;
    }
    default:
      return state;
  }
};

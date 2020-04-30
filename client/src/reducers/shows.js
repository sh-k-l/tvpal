import { ADD_SHOW, REORDER_SHOWS } from '../actions/shows';
import { SET_SHOWS } from '../actions/user';

export default (state = null, action) => {
  switch (action.type) {
    case SET_SHOWS:
      return action.shows;
    case ADD_SHOW:
      return [...state, action.show];
    case REORDER_SHOWS:
      const newShows = [...state];
      newShows.splice(action.to, 0, newShows.splice(action.from, 1)[0]);
      return newShows;
    default:
      return state;
  }
};

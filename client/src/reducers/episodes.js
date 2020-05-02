import { REQUEST_EPISODES, RECEIVE_EPISODES } from '../actions/episodes';

export default (state = {}, action) => {
  switch (action.type) {
    case REQUEST_EPISODES:
      return {
        ...state,
        [action.id]: null,
      };
    case RECEIVE_EPISODES:
      return {
        ...state,
        [action.id]: action.episodes,
      };
    default:
      return state;
  }
};

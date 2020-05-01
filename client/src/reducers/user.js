import { SET_USER, CLEAR_USER, ADD_USERNAME } from '../actions/user';

export default (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case CLEAR_USER:
      return null;
    case ADD_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    default:
      return state;
  }
};

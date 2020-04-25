import { SET_USER, CLEAR_USER } from '../actions/user';

export default (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case CLEAR_USER:
      return null;
    default:
      return state;
  }
};

import { TOGGLE_MODAL } from '../actions/modals';

const defaultState = {
  'show-adder': false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        [action.modal]: !state[action.modal],
      };
    default:
      return state;
  }
};

import { TOGGLE_MODAL } from '../actions/modals';

const defaultState = {
  'show-adder': false,
  'manage-show': false,
  show: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        [action.modal]: !state[action.modal],
        show: action.show ? action.show : null,
      };
    default:
      return state;
  }
};

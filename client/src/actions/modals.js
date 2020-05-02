export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const handleToggleModal = (modal) => (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
    modal: modal,
  });
};

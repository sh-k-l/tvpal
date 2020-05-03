export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const handleToggleModal = (modal, show) => (dispatch) => {
  if (show) {
    dispatch({
      type: TOGGLE_MODAL,
      modal: modal,
      show: show,
    });
  } else {
    dispatch({
      type: TOGGLE_MODAL,
      modal: modal,
    });
  }
};

export const setSelectedShow = (id) => (dispatch) => {};

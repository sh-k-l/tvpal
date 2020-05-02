import React from 'react';
import { connect } from 'react-redux';
import ShowAddingModal from '../ShowAddingModal';
import { handleToggleModal } from '../../actions/modals';

const ModalHandler = ({ modals, toggleModal }) => {
  return (
    <>
      <ShowAddingModal
        isOpen={modals['show-adder']}
        toggleVisibleModal={() => toggleModal('show-adder')}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  modals: state.modals,
});

const mapDispatchToProps = (dispatch) => ({
  toggleModal: (modal) => dispatch(handleToggleModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalHandler);

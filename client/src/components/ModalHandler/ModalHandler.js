import React from 'react';
import { connect } from 'react-redux';
import ShowAddingModal from '../ShowAddingModal/ShowAddingModal';
import ManageShowModal from '../ManageShowModal/ManageShowModal';
import { handleToggleModal } from '../../actions/modals';

const ModalHandler = ({ modals, toggleModal }) => {
  return (
    <>
      <ShowAddingModal
        isOpen={modals['show-adder']}
        toggleVisibleModal={() => toggleModal('show-adder')}
      />
      <ManageShowModal
        isOpen={modals['manage-show']}
        toggleVisibleModal={() => toggleModal('manage-show')}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  modals: state.modals,
});

const mapDispatchToProps = (dispatch) => ({
  toggleModal: (modal, show) => dispatch(handleToggleModal(modal, show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalHandler);

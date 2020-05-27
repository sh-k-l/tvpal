import React from 'react';
import RMSModal from 'react-modal-slider';
import 'react-modal-slider/lib/main.css';

const Modal = ({ toggleVisibleModal, isOpen, direction, width, children }) => {
  return (
    <RMSModal
      // default false
      isOpen={isOpen}
      // default 60%
      width={width ? width : '80%'}
      // default from right
      directionFrom={direction}
      // default Modal
      contentLabel={'Modal'}
      onRequestClose={toggleVisibleModal}
      // optional for accessibility
      setAppElement={'#root'}
      // default false allows you to skip setAppElement prop for react-modal
      ariaHideApp={true}
      // allow you to set the maximum width of the viewport
      // at which the modal will be expanded to full screen
      maxMediaWidth={1024}
      // allows you to decorate a className or overlayClassName
      className={`modal modal-${direction}`}
      overlayClassName={'string'}
    >
      <div className="close" onClick={toggleVisibleModal}>
        {/* <img alt="close modal" src={process.env.PUBLIC_URL + '/img/close.svg'} /> */}
        <i className="far fa-times-circle"></i>
      </div>
      {children}
    </RMSModal>
  );
};

export default Modal;

import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import { Overlay, ImageModal } from "./Modal.styled";


const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  

  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => { window.removeEventListener('keydown', handleKeyDown); };

  });




  const handleKeyDown = e => {
    if (e.code === 'Escape') {

      onClose();
    }
  };

    const handleBackdropClick = event => {

    if (event.currentTarget === event.target) {
      onClose();
    }
  };



        return createPortal(
            <Overlay onClick={handleBackdropClick}>
                <ImageModal>
                    {children}
                </ImageModal>
            </Overlay>,
            modalRoot,
        ); 
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
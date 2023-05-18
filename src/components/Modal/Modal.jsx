import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { Overlay, ModalStyled } from './Modal.styled';

const targetElement = document.querySelector('#modal-root');

function Modal({ children, onClickModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClickModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    disableBodyScroll(targetElement);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      enableBodyScroll(targetElement);
    };
  }, [onClickModal]);

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClickModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalStyled>{children}</ModalStyled>
    </Overlay>,
    targetElement
  );
}

export default Modal;

Modal.propTypes = {
  onClickModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

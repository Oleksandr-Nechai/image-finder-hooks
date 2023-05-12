import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import { Overlay, ModalStyled } from './Modal.styled';

const modalPortal = document.querySelector('#modal-root');

class Modal extends Component {
  targetElement = null;

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.targetElement = document.querySelector('#modal-root');
    disableBodyScroll(this.targetElement);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    enableBodyScroll(this.targetElement);
    clearAllBodyScrollLocks();
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClickModal();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClickModal();
    }
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalStyled>{children}</ModalStyled>
      </Overlay>,
      modalPortal
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClickModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

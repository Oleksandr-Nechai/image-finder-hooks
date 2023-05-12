import { Component } from 'react';
import { GoEyeClosed } from 'react-icons/go';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import {
  GalleryItem,
  Image,
  LargeImage,
  ModalButtonStyled,
} from './ImageGalleryItem.styled';

class ImageGalleryItems extends Component {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.image;
    const { galleryItemRef } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <GalleryItem onClick={this.toggleModal} ref={galleryItemRef}>
          <Image src={webformatURL} alt={tags} />
        </GalleryItem>
        {isOpen && (
          <Modal onClickModal={this.toggleModal}>
            <LargeImage src={largeImageURL} alt={tags} />
            <ModalButtonStyled type="button" onClick={this.toggleModal}>
              <GoEyeClosed />
            </ModalButtonStyled>
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItems;

ImageGalleryItems.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  galleryItemRef: PropTypes.object.isRequired,
};

import { useState } from 'react';
import { GoEyeClosed } from 'react-icons/go';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import {
  GalleryItem,
  Image,
  LargeImage,
  ModalButtonStyled,
} from './ImageGalleryItem.styled';

function ImageGalleryItems({ image }) {
  const { webformatURL, tags, largeImageURL } = image;
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  return (
    <>
      <GalleryItem onClick={toggleModal}>
        <Image src={webformatURL} alt={tags} />
      </GalleryItem>
      {isOpen && (
        <Modal onClickModal={toggleModal}>
          <LargeImage src={largeImageURL} alt={tags} />
          <ModalButtonStyled type="button" onClick={toggleModal}>
            <GoEyeClosed />
          </ModalButtonStyled>
        </Modal>
      )}
    </>
  );
}

export default ImageGalleryItems;

ImageGalleryItems.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

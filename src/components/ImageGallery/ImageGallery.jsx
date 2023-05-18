import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItems from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';

import { getImages } from 'services/api';
import {
  findImages,
  rejectRequest,
  handlerServerError,
  finishSearch,
} from 'services/notifications';

import { Gallery, GalleryList, GalleryFooter } from './ImageGallery.styled';

function ImageGallery({ nameImage, visible, toggleVisible }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(null);
  const [perPage] = useState(12);
  // const [x, setX] = useState(null);

  const galleryListRef = useRef();

  // useEffect(() => {
  //   if (page === 1) {
  //     return;
  //   }
  //   const gapSizeGallery = window
  //     .getComputedStyle(galleryListRef.current)
  //     .getPropertyValue('gap');

  //   const heightGalleryItem =
  //     galleryListRef.current.firstElementChild.getBoundingClientRect().height;

  //   const heightGalleryFooter =
  //     galleryListRef.current.nextElementSibling.getBoundingClientRect().height;

  //   const scrollPosition =
  //     heightGalleryItem * 3 -
  //     heightGalleryFooter +
  //     0.5 * parseInt(gapSizeGallery);

  //   setX(scrollPosition);

  //   scrollToBottom(x);
  // }, [page, x]);

  useEffect(() => {
    resetPage();
  }, [nameImage]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        toggleVisible();

        const { totalHits, hits } = await getImages(page, perPage, nameImage);

        if (!totalHits) {
          localStorage.removeItem('nameImage');
          rejectRequest();
          return;
        }
        findImages(hits.length);
        const totalImages = totalHits === 500 ? totalHits + 1 : totalHits;

        if (totalImages <= perPage * (page - 1) + hits.length) {
          finishSearch();
        }
        if (page === 1) {
          setImages([...hits]);
          setTotalElements(totalImages);
        } else {
          setImages(prevImages => [...prevImages, ...hits]);
        }
      } catch (error) {
        handlerServerError(error.message);
      } finally {
        toggleVisible();
      }
    };
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, toggleVisible]);

  // const scrollToBottom = scroll => {
  //   window.scrollBy({
  //     top: scroll,
  //     behavior: 'smooth',
  //   });
  // };

  const resetPage = () => {
    setImages([]);
    setPage(1);
    setTotalElements(null);
  };

  const incrementPage = () => setPage(prevPages => prevPages + 1);

  return (
    <Gallery>
      <GalleryList ref={galleryListRef}>
        {images.map(image => (
          <ImageGalleryItems image={image} key={image.id} />
        ))}
      </GalleryList>

      <GalleryFooter>
        <Loader visible={visible} />
        {totalElements > images.length && !visible && (
          <Button incrementPage={incrementPage}>Load more</Button>
        )}
      </GalleryFooter>
    </Gallery>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  nameImage: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  toggleVisible: PropTypes.func.isRequired,
};

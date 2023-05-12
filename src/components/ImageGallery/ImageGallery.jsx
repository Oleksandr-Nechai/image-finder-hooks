import { Component, createRef } from 'react';
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

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    totalElements: null,
    perPage: 12,
    galleryItemRef: createRef(),
    galleryFooterRef: createRef(),
    galleryListRef: createRef(),
  };

  async componentDidMount() {
    await this.fetchImages();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.nameImage !== this.props.nameImage) {
      await this.resetPage();
      await this.fetchImages();
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      await this.fetchImages();
    }
    if (this.state.page !== 1) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    const { galleryItemRef, galleryFooterRef, galleryListRef } = this.state;

    const gapSizeGallery = window
      .getComputedStyle(galleryListRef.current)
      .getPropertyValue('gap');

    const heightGalleryItem =
      galleryItemRef.current.getBoundingClientRect().height;

    const heightGalleryFooter =
      galleryFooterRef.current.getBoundingClientRect().height;

    const scrollPosition =
      heightGalleryItem * 3 -
      heightGalleryFooter +
      0.5 * parseInt(gapSizeGallery);

    window.scrollBy({
      top: scrollPosition,
      behavior: 'smooth',
    });
  };

  fetchImages = async (
    page = this.state.page,
    per_page = this.state.perPage,
    nameImage = this.props.nameImage
  ) => {
    try {
      this.props.toggleVisible();

      const { totalHits, hits } = await getImages(page, per_page, nameImage);

      if (!totalHits) {
        localStorage.removeItem('nameImage');
        rejectRequest();
        return;
      }
      findImages(hits.length);

      let totalImages = totalHits === 500 ? totalHits + 1 : totalHits;
      if (totalImages <= per_page * (page - 1) + hits.length) {
        finishSearch();
      }

      this.setState(({ images }) => ({
        images: page === 1 ? [...hits] : [...images, ...hits],
        totalElements: totalImages,
      }));
    } catch (error) {
      handlerServerError(error.message);
    } finally {
      this.props.toggleVisible();
    }
  };

  resetPage = () => this.setState({ page: 1, images: [], totalElements: null });

  incrementPage = () =>
    this.setState(prevState => ({ page: prevState.page + 1 }));

  render() {
    const {
      images,
      totalElements,
      galleryItemRef,
      galleryFooterRef,
      galleryListRef,
    } = this.state;
    const { visible } = this.props;

    return (
      <Gallery>
        <GalleryList ref={galleryListRef}>
          {images.map(image => (
            <ImageGalleryItems
              image={image}
              key={image.id}
              galleryItemRef={galleryItemRef}
            />
          ))}
        </GalleryList>

        <GalleryFooter ref={galleryFooterRef}>
          <Loader visible={visible} />
          {totalElements > images.length && !visible && (
            <Button incrementPage={this.incrementPage}>Load more</Button>
          )}
        </GalleryFooter>
      </Gallery>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  toggleVisible: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  nameImage: PropTypes.string.isRequired,
};

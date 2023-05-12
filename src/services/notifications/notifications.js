import { Notify } from 'notiflix/build/notiflix-notify-aio';

const adaptiveFontSize = Math.round(window.innerWidth * 0.0153) + 'px';

const messageOptions = {
  timeout: 2500,
  width: '30vw',
  fontSize: adaptiveFontSize,
  distance: '25px',
  borderRadius: '10px',
  cssAnimationStyle: 'zoom',
};

export function findImages(amount) {
  return Notify.success(`Hooray! We found ${amount} images.`, messageOptions);
}

export function validationRequest(msg = 'Change search.Please try again.') {
  return Notify.failure(msg, messageOptions);
}

export function rejectRequest() {
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    messageOptions
  );
}

export function handlerServerError(message) {
  return Notify.failure(
    `Something went wrong. Please try again. ${message}`,
    messageOptions
  );
}

export function finishSearch() {
  return Notify.info(
    "We're sorry, but you've reached the end of search results.",
    messageOptions
  );
}

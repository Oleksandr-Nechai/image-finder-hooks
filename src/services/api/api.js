import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24494931-7dc5820272f9876b2770bf0f4';
const BASE_PARAMS = {
  timeout: 3000,
  params: {
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: false,
    per_page: '12',
  },
};

async function getImages(page, per_page, name) {
  const searchParams = structuredClone(BASE_PARAMS);
  searchParams.params = {
    ...searchParams.params,
    ...{ q: name, page, per_page },
  };
  const { data } = await axios.get(`${BASE_URL}`, searchParams);

  return data;
}

export { getImages };

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_kga0xwQGXGdWBIJYW8uXsn6WHOUZ7z5182ltmc85A7HmV3yufokuvdONnMoq9pXv';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

export function fetchCatByBreed(breedId) {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
}

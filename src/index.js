import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const selector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const info = document.querySelector('.cat-info');

function hideElement(element) {
  element.classList.add('is-hidden');
}

function showElement(element) {
  element.classList.remove('is-hidden');
}

function renderSelectOptions() {
  fetchBreeds()
    .then(response => response.data)
    .then(breeds => {
      const markup = breeds
        .map(breed => {
          return `<option value ="${breed.id}">${breed.name}</option>`;
        })
        .join('');
      selector.innerHTML = markup;
      showElement(selector);
      hideElement(loader);
    })
    .catch(err => {
      hideElement(selector);
      hideElement(loader);
      showElement(error);
    });
}

renderSelectOptions();

selector.addEventListener('input', e => {
  showElement(loader);
  hideElement(info);
  info.innerHTML = '';
  const breedId = e.target.value;
  fetchCatByBreed(breedId)
    .then(response => response.data[0].breeds[0])
    .then(data => {
      const markup = `<div><h1>${data.name}</h1>
      <p>${data.description}</p>
      <p><span>Temperament: </span>${data.temperament}</p></div>`;
      info.insertAdjacentHTML('beforeend', markup);
    })
    .catch(err => {
      hideElement(selector);
      hideElement(loader);
      showElement(error);
    });
});

selector.addEventListener('input', e => {
  const breedId = e.target.value;
  fetchCatByBreed(breedId)
    .then(response => response.data[0])
    .then(data => {
      const markup = `<img src=${data.url} alt='' />`;
      info.insertAdjacentHTML('afterbegin', markup);
    })
    .then(() => {
      showElement(info);
      hideElement(loader);
    })
    .catch(err => {
      hideElement(selector);
      hideElement(loader);
      showElement(error);
    });
});

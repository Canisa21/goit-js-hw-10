import { fetchBreeds, fetchCatByBreed } from './cat-api';

import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const load = document.querySelector(".loader");
const errorInf = document.querySelector(".error");


load.classList.add("hidden");
errorInf.classList.add("hidden");

try {
 fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(error);
}

function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);
  
}

breedSelect.addEventListener('change', e => {
  load.classList.remove("hidden");
  fetchCatByBreed(e.target.value).then(data => renderCat(data[0]));
});



function renderCat(catData) {
  if (catData) {
    try {
      const { url } = catData;
      const { description, name, temperament } = catData.breeds[0];

      catInfo.insertAdjacentHTML(
        'beforeend',
        `<div>
        <h2>${name}</h2>
        <figure class="cat-pictures">
        <img src="${url}" alt="${name}" />
        <figcaption class="cat-description">
        <p><strong>Description: </strong>${description}</p>
        <p><strong>Temperament: </strong>${temperament}</p>
        </figcaption>
        </figure>
    </div>`
      );
        load.style.display = 'none';
      errorInf.style.display = 'none';
    } catch (error) {
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`
      );
    }
  } else {
    Notiflix.Notify.failure(
      `Error loading content. Please try refreshing the page.`
    );
  }
}
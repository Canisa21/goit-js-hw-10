import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const load = document.querySelector(".loader");
const errorInf = document.querySelector(".error");

load.classList.add("hidden");
errorInf.classList.add("hidden");

try {
  load.classList.remove("hidden");
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
  load.classList.add("hidden");
}

breedSelect.addEventListener('change', e => {
  load.classList.remove("hidden");
  fetchCatByBreed(e.target.value).then(data => renderCat(data[0]));
});

function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div>
        <h2>${name}</h2>
        <img src="${url}" alt="${name}" />
        <p>Description:${description}</p>
        <p>Temperament:${temperament}</p>
    </div>`
  );
  load.classList.add("hidden");
}
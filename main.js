import {
  API_KEY,
  BASE_URL,
  IMG_URL,
  language,
} from './api.js';

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const cotentEl = document.querySelector('.cotent');
const buttonEL = document.querySelector('button');

async function getMovies() {
  const numberRandom = getRandomArbitrary(2, 997);
  const url = `${BASE_URL}/${numberRandom}?${API_KEY}&${language}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status != 404) {
      const div = document.createElement('div');
      const img = document.createElement('img');
      const h2 = document.createElement('h2');
      const p = document.createElement('p');

      const urlImage = `${IMG_URL}${data.poster_path}`;
      img.src = urlImage;
      h2.innerText = data.title;
      p.innerText = data.overview ? data.overview : 'Não existe uma descrição para esse filme';

      div.classList.add('card');
      div.appendChild(img);
      div.appendChild(h2);
      div.appendChild(p);

      const card = document.querySelector('.card');
      
      if (card) {
      card.remove();
      }
      cotentEl.insertBefore(div, buttonEL);
    } else {
      await getMovies();
    }
  } catch (error) {
   
  }
}

buttonEL.addEventListener('click',getMovies);

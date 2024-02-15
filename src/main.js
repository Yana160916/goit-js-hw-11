// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');
  const gallery = document.querySelector('.images');
  const loader = document.createElement('div');
  loader.className = 'loader';
  document.body.appendChild(loader);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTerm = event.target.querySelector('input[name="input"]').value.trim();

    if (searchTerm !== '') {
      loader.style.display = 'block';


      const apiKey = '42394453-5b1f47b766fae7b80cadc39a1';
      const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          loader.style.display = 'none';
          displayImages(data.hits);
        })
        .catch(error => {
          console.error('Error fetching images:', error);
          loader.style.display = 'none';
        });
    }
  });

  function displayImages(images) {
    gallery.innerHTML = ''; 

    if (images.length === 0) {

      iziToast.error({
        title: 'Error',
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: 'topCenter',
      });
    } else {
      images.forEach(image => {
        const card = document.createElement('li');
        card.innerHTML = `
          <a href="${image.largeImageURL}" data-lightbox="gallery">
            <img src="${image.webformatURL}" alt="${image.tags}" />
          </a>
          <p>${image.likes} Likes | ${image.views} Views | ${image.comments} Comments | ${image.downloads} Downloads</p>
        `;
        gallery.appendChild(card);
      });


      simpleLightbox.refresh();
    }
  }
});
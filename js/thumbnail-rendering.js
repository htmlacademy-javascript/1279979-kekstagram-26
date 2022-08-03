
import { createFullPhoto } from './popup-rendering.js';
import { getRandomArrayElement } from './utils.js';

const MAX_RANDOM_PHOTO = 10;

const containerImagesOtherUsers = document.querySelector('.pictures');
const pictureUserTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const clearPictures = () => {
  const renderPictures = document.querySelectorAll('.picture');
  for (const renderPicture of renderPictures) {
    renderPicture.remove();
  }
};

const renderThumbnails = (photos) => {
  const photosListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureUserElement = pictureUserTemplate.cloneNode(true);

    pictureUserElement.querySelector('.picture__img').src = photo.url;
    pictureUserElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureUserElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photosListFragment.append(pictureUserElement);

    pictureUserElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      createFullPhoto(photo);
    });
  });

  clearPictures();
  containerImagesOtherUsers.append(photosListFragment);
};

const renderRandomThumbnails = (photos) => {
  const randomPhotos = [];
  while (randomPhotos.length < MAX_RANDOM_PHOTO) {
    const el = getRandomArrayElement(photos);

    if (!randomPhotos.includes(el)) {
      randomPhotos.push(el);
    }
  }

  renderThumbnails(randomPhotos);
};

const renderDicsussedThumbnails = (photos) => {
  const dicsussedPhotos = photos
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);

  renderThumbnails(dicsussedPhotos);
};


export { renderThumbnails, containerImagesOtherUsers, renderRandomThumbnails, renderDicsussedThumbnails };



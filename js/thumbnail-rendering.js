
import { createFullPhoto, openFullPhoto} from './popup-rendering.js';
import {getRandomArrayElement} from './utils.js';

const MAX_RANDOM_PHOTO = 10;

const containerImagesOtherUsers = document.querySelector('.pictures');
const pictureUserTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const getCommentAmount = (a,b) => b.comments.length - a.comments.length;

const clearPictures = () => {
  const renderPictures = document.querySelectorAll('.picture');
  for(const renderPicture of renderPictures) {
    renderPicture.remove();
  }
};

const renderThumbnails = (similarPhotos) => {

  const photosListFragment = document.createDocumentFragment();

  similarPhotos.forEach((photo) => {
    const pictureUserElement = pictureUserTemplate.cloneNode(true);
    pictureUserElement.querySelector('.picture__img').src = photo.url;
    pictureUserElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureUserElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photosListFragment.append(pictureUserElement);
    pictureUserElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFullPhoto();
      createFullPhoto(photo);
    });
  });
  clearPictures();
  containerImagesOtherUsers.append(photosListFragment);
};

const renderRandomThumbnails = (similarPhotos) => {

  const randomPhotos = [];

  while (randomPhotos.length < similarPhotos.length) {
    randomPhotos.push(getRandomArrayElement(similarPhotos));
  }
  const uniqueRandomPhotos = [...new Set(randomPhotos)];

  const photosListFragment = document.createDocumentFragment();
  uniqueRandomPhotos.slice(0, MAX_RANDOM_PHOTO).forEach((photo) => {
    const pictureUserElement = pictureUserTemplate.cloneNode(true);

    pictureUserElement.querySelector('.picture__img').src = photo.url;
    pictureUserElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureUserElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photosListFragment.append(pictureUserElement);
    pictureUserElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFullPhoto();
      createFullPhoto(photo);
    });
  });

  clearPictures();
  containerImagesOtherUsers.append(photosListFragment);

};

const renderDicsussedThumbnails = (similarPhotos) => {

  const photosListFragment = document.createDocumentFragment();

  similarPhotos.slice().sort(getCommentAmount).forEach((photo) => {
    const pictureUserElement = pictureUserTemplate.cloneNode(true);
    pictureUserElement.querySelector('.picture__img').src = photo.url;
    pictureUserElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureUserElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photosListFragment.append(pictureUserElement);
    pictureUserElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFullPhoto();
      createFullPhoto(photo);
    });

  });
  clearPictures();
  containerImagesOtherUsers.append(photosListFragment);
};


export { renderThumbnails, containerImagesOtherUsers, renderRandomThumbnails, renderDicsussedThumbnails};



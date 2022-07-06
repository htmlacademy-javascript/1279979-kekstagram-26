import { getSimilarPhotosDescriptions } from './data.js';
import { createFullPhoto, openFullPhoto } from './popup-rendering.js';
const similarPhotos = getSimilarPhotosDescriptions();
const containerImagesOtherUsers = document.querySelector('.pictures');
const pictureUserTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photosListFragment = document.createDocumentFragment();

similarPhotos.forEach((photo) => {
  const pictureUserElement = pictureUserTemplate.cloneNode(true);
  pictureUserElement.querySelector('.picture__img').src = photo.url;
  pictureUserElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureUserElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photosListFragment.append(pictureUserElement);
  pictureUserElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    createFullPhoto(photo);
    openFullPhoto();
  });
});


const getThumbnail = () => containerImagesOtherUsers.append(photosListFragment);
export { getThumbnail, containerImagesOtherUsers, similarPhotos };



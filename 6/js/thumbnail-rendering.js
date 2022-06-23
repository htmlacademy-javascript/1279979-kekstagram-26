import { getSimilarPhotosDescriptions } from './data.js';

const similarPhotos = getSimilarPhotosDescriptions();
const containerImagesOtherUsers = document.querySelector('.pictures');
const pictureUserTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photosListFragment = document.createDocumentFragment();

similarPhotos.forEach(({ id, url, likes, comments }) => {
  const pictureUserElement = pictureUserTemplate.cloneNode(true);
  pictureUserElement.querySelector('.picture__img').src = url;
  pictureUserElement.querySelector('.picture__likes').textContent = likes;
  pictureUserElement.querySelector('.picture__comments').textContent = comments.length;
  pictureUserElement.dataset.id = id;
  photosListFragment.append(pictureUserElement);
});


const getThumbnail = () => containerImagesOtherUsers.append(photosListFragment);
export { getThumbnail, containerImagesOtherUsers, similarPhotos };

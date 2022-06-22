import { getSimilarPhotosDescriptions } from './data.js';

const similarPhotos = getSimilarPhotosDescriptions();
console.log(similarPhotos);
const containerImagesOtherUsers = document.querySelector('.pictures');


const pictureUserTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photosListFragment = document.createDocumentFragment();

similarPhotos.forEach((similarPhoto) => {
  const pictureUserElement = pictureUserTemplate.cloneNode(true);
  pictureUserElement.querySelector('.picture__img').src = similarPhoto.url;
  pictureUserElement.querySelector('.picture__likes').textContent = similarPhoto.likes;
  pictureUserElement.querySelector('.picture__comments').textContent = similarPhoto.comments.length;
  photosListFragment.append(pictureUserElement);
});


const getThumbnail = () => containerImagesOtherUsers.append(photosListFragment);
export { getThumbnail };

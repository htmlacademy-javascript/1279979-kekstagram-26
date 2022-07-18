
import { createFullPhoto, openFullPhoto} from './popup-rendering.js';

const containerImagesOtherUsers = document.querySelector('.pictures');
const pictureUserTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


const photosListFragment = document.createDocumentFragment();

const renderThumbnails = (similarPhotos) => {

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

  containerImagesOtherUsers.append(photosListFragment);
};


export { renderThumbnails, containerImagesOtherUsers };



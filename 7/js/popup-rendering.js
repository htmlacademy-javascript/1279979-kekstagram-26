const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const fullPhoto = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.social__likes .likes-count');
const commentList = bigPicture.querySelector('.social__comments');
const commentItem = commentList.querySelector('.social__comment');
const newCommentListFragment = document.createDocumentFragment();
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentCountNumber = bigPicture.querySelector('.social__comment-count .comments-count');
const fullPhotoDescription = bigPicture.querySelector('.social__caption');
const commentLoader = bigPicture.querySelector('.comments-loader');

const onPopupKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupKeyDown);
  }
};

const openFullPhoto = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupKeyDown);
};

const closeFullPhoto = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupKeyDown);
  document.body.classList.remove('modal-open');
  commentList.innerHTML = '';
};

const createFullPhoto = (data) => {
  fullPhoto.src = data.url;
  likesCount.textContent = data.likes;
  commentCountNumber.textContent = data.comments.length;
  data.comments.forEach((comment) => {
    const newCommentItem = commentItem.cloneNode(true);
    newCommentItem.querySelector('.social__picture').src = comment.avatar;
    newCommentItem.querySelector('.social__picture').alt = comment.name;
    newCommentItem.querySelector('.social__text').textContent = comment.message;
    newCommentListFragment.append(newCommentItem);
  });
  commentList.append(newCommentListFragment);
  fullPhotoDescription.textContent = data.description;
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
};

closeFullPhoto();

closeButton.addEventListener('click', () => {
  closeFullPhoto();
});
export { createFullPhoto, openFullPhoto };


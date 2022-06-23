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

closeButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

const createFullPhoto = (data) => {
  bigPicture.classList.remove('hidden');
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
  commentList.innerHTML = '';
  commentList.append(newCommentListFragment);
  fullPhotoDescription.textContent = data.description;
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
};
export { createFullPhoto };


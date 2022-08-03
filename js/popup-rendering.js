
const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const fullPhoto = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.social__likes .likes-count');
const commentList = bigPicture.querySelector('.social__comments');
const commentItem = commentList.querySelector('.social__comment');

const currentCommentCount = bigPicture.querySelector('.social__comment-count');
const allCommentCount = bigPicture.querySelector('.social__comment-count .comments-count');

const fullPhotoDescription = bigPicture.querySelector('.social__caption');
const loadCommentButton = bigPicture.querySelector('.social__comments-loader');

const MAX_NUMBER_COMMENTS = 5;

let closeFullPhoto = null;
let commentsCount = 0;
let serverData = null;

const hideButtonLoadMore = () => {
  if (commentsCount >= serverData.comments.length) {
    loadCommentButton.classList.toggle('hidden');
  }
};

const createComment = (value) => {
  const newCommentItem = commentItem.cloneNode(true);

  newCommentItem.querySelector('.social__picture').src = value.avatar;
  newCommentItem.querySelector('.social__picture').alt = value.name;
  newCommentItem.querySelector('.social__text').textContent = value.message;

  return newCommentItem;
};

const renderCommentsPart = () => {
  const commentListFragment = document.createDocumentFragment();
  const newComments = serverData.comments.slice(commentsCount, commentsCount + MAX_NUMBER_COMMENTS);
  const commentElements = newComments.map(createComment);

  commentListFragment.append(...commentElements);
  commentList.append(commentListFragment);

  commentsCount += newComments.length;
  currentCommentCount.textContent = `${commentsCount} из ${serverData.comments.length} комментариев`;

  hideButtonLoadMore();
};

const onPopupKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    closeFullPhoto();
  }
};

const onCloseButtonClick = () => {
  closeFullPhoto();
};

const openFullPhoto = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupKeyDown);
  loadCommentButton.classList.remove('hidden');
  closeButton.addEventListener('click', onCloseButtonClick);
};

const createFullPhoto = (data) => {
  openFullPhoto();

  fullPhoto.src = data.url;
  likesCount.textContent = data.likes;
  allCommentCount.textContent = data.comments.length;
  fullPhotoDescription.textContent = data.description;

  commentsCount = 0;
  serverData = data;
  renderCommentsPart();
  loadCommentButton.addEventListener('click', renderCommentsPart);
};


closeFullPhoto = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupKeyDown);
  document.body.classList.remove('modal-open');
  commentList.innerHTML = '';
  // loadCommentButton.removeEventListener('click', onRenderOtherComments);
  closeButton.removeEventListener('click', onCloseButtonClick);
};

closeFullPhoto();

export { createFullPhoto, openFullPhoto, closeFullPhoto };


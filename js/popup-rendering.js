
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

let closeFullPhoto = null;
let onRenderOtherComments;
let renderCommentsList;
const MAX_NUMBER_COMMENTS = 5;
let commentsCount = 0;

const hideButtonLoadMore = (data) => {
  if(commentsCount >= data.comments.length) {
    loadCommentButton.classList.toggle('hidden');
  }
};

const createComment = (value) => {
  const newCommentItem = commentItem.cloneNode(true);
  newCommentItem.dataset.id = value.id;
  newCommentItem.querySelector('.social__picture').src = value.avatar;
  newCommentItem.querySelector('.social__picture').alt = value.name;
  newCommentItem.querySelector('.social__text').textContent = value.message;

  return newCommentItem;
};

const createCommentsList = (dataArrayComments) => {
  const newCommentListFragment = document.createDocumentFragment();
  dataArrayComments.slice(0, MAX_NUMBER_COMMENTS).forEach((dataArrayComment) => {
    newCommentListFragment.append(createComment(dataArrayComment));
  });
  commentList.append(newCommentListFragment);
  currentCommentCount.textContent = `${commentList.children.length} из ${allCommentCount.textContent} комментариев`;

};

const onPopupKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    closeFullPhoto();
  }
};
const onCloseButtonClick = () => {
  closeFullPhoto();
};

const createFullPhoto = (data) => {
  fullPhoto.src = data.url;
  likesCount.textContent = data.likes;
  allCommentCount.textContent = data.comments.length;
  fullPhotoDescription.textContent = data.description;
  createCommentsList(data.comments);
  commentsCount = commentList.children.length;
  onRenderOtherComments = () => {
    const uniqueComments = [];
    const comments = data.comments;
    commentsCount += MAX_NUMBER_COMMENTS;
    renderCommentsList = Array.from(commentList.children);

    comments.forEach((comment) => {
      const uniquecomments = renderCommentsList.some((element) => (+element.dataset.id === comment.id));

      if(!uniquecomments) {
        uniqueComments.push(comment);
      }
    });
    createCommentsList(uniqueComments);
    hideButtonLoadMore(data);
  };

  hideButtonLoadMore(data);

  loadCommentButton.addEventListener('click', onRenderOtherComments);
};

const openFullPhoto = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupKeyDown);
  loadCommentButton.classList.remove('hidden');
  closeButton.addEventListener('click', onCloseButtonClick);
};


closeFullPhoto = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupKeyDown);
  document.body.classList.remove('modal-open');
  commentList.innerHTML = '';
  loadCommentButton.removeEventListener('click', onRenderOtherComments);
  commentsCount = 0;
  closeButton.removeEventListener('click', onCloseButtonClick);
};


closeFullPhoto();


export { createFullPhoto, openFullPhoto, closeFullPhoto };


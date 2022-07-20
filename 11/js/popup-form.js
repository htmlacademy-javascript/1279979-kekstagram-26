import {onChangeBiggerScale, onChangeSmallerScale,scaleBiggerButton,scaleSmallerButton} from './image-editor.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const loadUserPhoto = imageUploadForm.querySelector('#upload-file');
const imageEditor = imageUploadForm.querySelector('.img-upload__overlay');
const closeImageUploadForm = imageUploadForm.querySelector('#upload-cancel');
const textHashtags = imageUploadForm.querySelector('.text__hashtags');
const textDescription = imageUploadForm.querySelector('.text__description');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onPopupKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    imageEditor.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupKeyDown);
  }
};

const openOpenForm = () => {
  imageEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupKeyDown);
  scaleSmallerButton.addEventListener('click', onChangeSmallerScale);
  scaleBiggerButton.addEventListener('click', onChangeBiggerScale);
};

const closeForm = () => {
  imageEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupKeyDown);
  scaleBiggerButton.removeEventListener('click', onChangeBiggerScale);
  scaleSmallerButton.removeEventListener('click', onChangeSmallerScale);
  imageUploadForm.reset();
};

loadUserPhoto.addEventListener('change', () => {
  openOpenForm();
  closeImageUploadForm.addEventListener('click', () => {
    closeForm();
  });
});


imageUploadForm.addEventListener('keydown', (evt) => {
  if (document.activeElement === textHashtags || document.activeElement === textDescription) {
    evt.stopPropagation();
  }
});

export { imageUploadForm, textHashtags, closeForm, blockSubmitButton, unblockSubmitButton };

import {onChangeBiggerScaleClick, onChangeSmallerScaleClick,scaleBiggerButton,scaleSmallerButton, setDefaultState} from './image-editor.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const loadUserPhoto = imageUploadForm.querySelector('#upload-file');
const imgUploadPreview = imageUploadForm.querySelector('.img-upload__preview img');
const imageEditor = imageUploadForm.querySelector('.img-upload__overlay');
const closeImageUploadForm = imageUploadForm.querySelector('#upload-cancel');
const textHashtags = imageUploadForm.querySelector('.text__hashtags');
const textDescription = imageUploadForm.querySelector('.text__description');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');

let closeForm = null;
const showPreview = () => {
  const file = loadUserPhoto.files[0];
  imgUploadPreview.src = URL.createObjectURL(file);
};


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onCloseImageUploadFormClick = () => {
  closeForm();
};

const onPopupKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    imageEditor.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupKeyDown);
    closeImageUploadForm.removeEventListener('click', onCloseImageUploadFormClick);
    scaleBiggerButton.removeEventListener('click', onChangeBiggerScaleClick);
    scaleSmallerButton.removeEventListener('click', onChangeSmallerScaleClick);
  }
};


const openForm = () => {
  imageEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupKeyDown);
  scaleSmallerButton.addEventListener('click', onChangeSmallerScaleClick);
  scaleBiggerButton.addEventListener('click', onChangeBiggerScaleClick);
};

closeForm = () => {
  imageEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupKeyDown);
  scaleBiggerButton.removeEventListener('click', onChangeBiggerScaleClick);
  scaleSmallerButton.removeEventListener('click', onChangeSmallerScaleClick);
  closeImageUploadForm.removeEventListener('click', onCloseImageUploadFormClick);
  imageUploadForm.reset();
  setDefaultState();
};

loadUserPhoto.addEventListener('change', () => {
  openForm();
  showPreview();
  closeImageUploadForm.addEventListener('click', onCloseImageUploadFormClick);
});


imageUploadForm.addEventListener('keydown', (evt) => {
  if (document.activeElement === textHashtags || document.activeElement === textDescription) {
    evt.stopPropagation();
  }
});

export { imageUploadForm, textHashtags, closeForm, blockSubmitButton, unblockSubmitButton };



const imageUploadForm = document.querySelector('.img-upload__form');
const loadUserPhoto = imageUploadForm.querySelector('#upload-file');
const imageEditor = imageUploadForm.querySelector('.img-upload__overlay');
const closeImageUploadForm = imageUploadForm.querySelector('#upload-cancel');
const textHashtags = imageUploadForm.querySelector('.text__hashtags');
const textDescription = imageUploadForm.querySelector('.text__description');


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
};

const closeForm = () => {
  imageEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupKeyDown);
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

export { imageUploadForm, textHashtags };

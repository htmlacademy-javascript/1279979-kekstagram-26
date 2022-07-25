import { imageUploadForm, textHashtags, blockSubmitButton } from './popup-form.js';
import { sendData } from './data.js';


const HASHTAG_VALID_REGEX = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;
const HASHTAG_MAX_QUALITY = 5;
const HASHTAG_VALID_CONDITION = '<br>хэш-тег начинается с символа # (решётка); строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.; хеш-тег не может состоять только из одной решётки; максимальная длина одного хэш-тега 20 символов, включая решётку; хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом; хэш-теги разделяются пробелами;';


const getHashTagsArray = (value) => value.trim().toLowerCase().split(' ').filter(Boolean);

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__error',
  errorTextParent: 'img-upload__error',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});


pristine.addValidator(textHashtags, (value) => {
  const hashTags = getHashTagsArray(value);
  const result =  hashTags.every((hashtag) => (HASHTAG_VALID_REGEX.test(hashtag)));
  return result;

}, HASHTAG_VALID_CONDITION);

pristine.addValidator(textHashtags, (value) => {
  const hashTags = getHashTagsArray(value);
  return hashTags.length <= HASHTAG_MAX_QUALITY;
}, `нельзя указать больше ${HASHTAG_MAX_QUALITY} хэш-тегов;`);


pristine.addValidator(textHashtags, (value) => {
  const hashTags = getHashTagsArray(value);
  const uniqueHashTags = Array.from(new Set(hashTags));
  return (hashTags.length === uniqueHashTags.length);
}, 'Один и тот же хэш-тег не может быть использован дважды;');


const setUserFormSubmit = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
    blockSubmitButton();
    const formData = new FormData(evt.target);
    sendData(formData, ()=>{
      pristine.reset();
    });
    const errors = pristine.getErrors();
    if (errors.length) {
      evt.preventDefault();
    }
  });
};

export {setUserFormSubmit};

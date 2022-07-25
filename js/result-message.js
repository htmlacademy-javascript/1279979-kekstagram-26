const getSuccesMessage = () => {
  const succsesMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  const succsesMessage = succsesMessageTemplate.cloneNode(true);
  const successButton = succsesMessage.querySelector('.success__button');
  document.body.appendChild(succsesMessage);
  let onSuccesMessageOutsideClick = null;

  const onSuccesMessageKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      succsesMessage.classList.add('hidden');
      document.removeEventListener('keydown', onSuccesMessageKeyDown);
      document.removeEventListener('click', onSuccesMessageOutsideClick);
    }

  };

  onSuccesMessageOutsideClick = (evt) => {

    if(succsesMessage === evt.target) {
      succsesMessage.classList.add('hidden');
      document.removeEventListener('click', onSuccesMessageOutsideClick);
      document.removeEventListener('keydown', onSuccesMessageKeyDown);
    }

  };

  const onSuccessButtonClick = () => {
    succsesMessage.classList.add('hidden');
    successButton.removeEventListener('click', onSuccessButtonClick);
    document.removeEventListener('click', onSuccesMessageOutsideClick);
    document.removeEventListener('keydown', onSuccesMessageKeyDown);
  };

  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onSuccesMessageKeyDown);
  document.addEventListener('click', onSuccesMessageOutsideClick);
};

const getErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  errorMessage.style.zIndex = '100';
  document.body.appendChild(errorMessage);
  let onErrorMessageOutsideClick = null;

  const onErrorMessageKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorMessage.classList.add('hidden');
      document.removeEventListener('keydown', onErrorMessageKeyDown);
      document.removeEventListener('click', onErrorMessageOutsideClick);
    }

  };

  onErrorMessageOutsideClick = (evt) => {
    if(errorMessage === evt.target) {
      errorMessage.classList.add('hidden');
      document.removeEventListener('click', onErrorMessageOutsideClick);
      document.removeEventListener('keydown', onErrorMessageKeyDown);
    }

  };

  const onErrorButtonClick = () => {
    errorMessage.classList.add('hidden');
    errorButton.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('click', onErrorMessageOutsideClick);
    document.removeEventListener('keydown', onErrorMessageKeyDown);
  };

  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorMessageKeyDown);
  document.addEventListener('click', onErrorMessageOutsideClick);
};


export {getSuccesMessage, getErrorMessage};

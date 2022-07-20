const getSuccesMessage = () => {
  const succsesMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  const succsesMessage = succsesMessageTemplate.cloneNode(true);
  const successButton = succsesMessage.querySelector('.success__button');
  document.body.appendChild(succsesMessage);
  const onSuccesMessageKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      succsesMessage.classList.add('hidden');
      document.removeEventListener('keydown', onSuccesMessageKeyDown);
    }
  };
  const onSuccesMessageOutsideClick = (evt) => {

    if(succsesMessage === evt.target) {
      succsesMessage.classList.add('hidden');
      document.removeEventListener('click', onSuccesMessageOutsideClick);
    }
  };
  successButton.addEventListener('click', ()=> {
    succsesMessage.classList.add('hidden');
  });
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
  const onErrorMessageKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorMessage.classList.add('hidden');
      document.removeEventListener('keydown', onErrorMessageKeyDown);
    }
  };
  const onErrorMessageOutsideClick = (evt) => {
    if(errorMessage === evt.target) {
      errorMessage.classList.add('hidden');
      document.removeEventListener('click', onErrorMessageOutsideClick);
    }
  };
  errorButton.addEventListener('click', ()=> {
    errorMessage.classList.add('hidden');
  });
  document.addEventListener('keydown', onErrorMessageKeyDown);
  document.addEventListener('click', onErrorMessageOutsideClick);
};


export {getSuccesMessage, getErrorMessage};

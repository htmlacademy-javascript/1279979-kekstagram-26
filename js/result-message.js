const MessageType = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const getMessage = (selector) => () => {
  const message = document
    .querySelector(`#${selector}`)
    .content
    .querySelector(`.${selector}`)
    .cloneNode(true);

  const button = message.querySelector('button');
  document.body.appendChild(message);

  let onOutsideClick = null;

  const onMessageKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      message.classList.add('hidden');
      document.removeEventListener('keydown', onMessageKeyDown);
      document.removeEventListener('click', onOutsideClick);
    }

  };

  onOutsideClick = (evt) => {
    if (message === evt.target) {
      message.classList.add('hidden');
      document.removeEventListener('click', onOutsideClick);
      document.removeEventListener('keydown', onMessageKeyDown);
    }
  };

  const onButtonClick = () => {
    message.classList.add('hidden');
    button.removeEventListener('click', onButtonClick);
    document.removeEventListener('click', onOutsideClick);
    document.removeEventListener('keydown', onMessageKeyDown);
  };

  button.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onMessageKeyDown);
  document.addEventListener('click', onOutsideClick);
};


export const getSuccesMessage = getMessage(MessageType.SUCCESS);
export const getErrorMessage = getMessage(MessageType.ERROR);

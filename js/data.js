import { renderThumbnails, renderRandomThumbnails, renderDicsussedThumbnails } from './thumbnail-rendering.js';
import { showAlert, debounce } from './utils.js';
import { unblockSubmitButton, closeForm } from './popup-form.js';
import { setDefaultState } from './image-editor.js';
import { showFilters, setRandomClick, setDefaultСlick, setDiscussedClick } from './filter.js';
import { getSuccesMessage, getErrorMessage } from './result-message.js';

const URL_GET = 'https://26.javascript.pages.academy/kekstagram/data';
const URL_POST = 'https://26.javascript.pages.academy/kekstagram/data';
const RERENDER_DELAY = 500;

const renderData = (photos) => {
  renderThumbnails(photos);
  showFilters();
  setDefaultСlick(debounce(() => renderThumbnails(photos)), RERENDER_DELAY);
  setRandomClick(debounce(() => renderRandomThumbnails(photos)), RERENDER_DELAY);
  setDiscussedClick(debounce(() => renderDicsussedThumbnails(photos)), RERENDER_DELAY);
};

const getData = () => {
  fetch(URL_GET)
    .then((response) => response.json())
    .then(renderData)
    .catch(() => showAlert('Ошибка при загрузке данных, попробуйте обновить страницу'));
};

const sendData = (data, onFinally) => {
  fetch(URL_POST, {
    method: 'POST',
    body: data
  })
    .then((responce) => {
      if (responce.ok) {
        closeForm();
        setDefaultState();
        getSuccesMessage();
      } else {
        getErrorMessage();
      }
    })
    .catch(getErrorMessage)
    .finally(() => {
      if (typeof onFinally === 'function') {
        onFinally();
      }
      unblockSubmitButton();

    });

};

export { getData, sendData };

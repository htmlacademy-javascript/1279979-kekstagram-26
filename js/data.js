import { renderThumbnails, renderRandomThumbnails, renderDicsussedThumbnails } from './thumbnail-rendering.js';
import {showAlert, debounce} from './utils.js';
import { unblockSubmitButton, closeForm } from './popup-form.js';
import {setDefaultState} from './image-editor.js';
import { showFilters, setRandomClick, setDefaultclick, setDiscussedclick} from './filter.js';

import { getSuccesMessage, getErrorMessage } from './result-message.js';
const RERENDER_DELAY = 500;
const getData = () => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      renderThumbnails(photos);
      showFilters();
      setDefaultclick(debounce(()=> renderThumbnails(photos)), RERENDER_DELAY);
      setRandomClick(debounce(() => renderRandomThumbnails(photos)), RERENDER_DELAY);
      setDiscussedclick(debounce(() => renderDicsussedThumbnails(photos)), RERENDER_DELAY);
    })
    .catch(() => showAlert('Ошибка при загрузке данных, попробуйте обновить страницу'));
};
const sendData = (data, onFinally) => {

  fetch('https://26.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: data
  })
    .then((responce)=> {
      if(responce.ok) {
        closeForm();
        setDefaultState();
        getSuccesMessage();
      } else {
        getErrorMessage();
      }
    })
    .catch(()=>{
      getErrorMessage();
    })
    .finally(()=> {
      if(typeof onFinally === 'function') {
        onFinally();
      }
      unblockSubmitButton();

    });

};

export {getData, sendData};

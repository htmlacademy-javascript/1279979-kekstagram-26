
const imgFiltersForm = document.querySelector('.img-filters__form');
const filterButtons = imgFiltersForm.querySelectorAll('.img-filters__button');
const filterRandomButton = imgFiltersForm.querySelector('#filter-random');
const filterDiscussedButton = imgFiltersForm.querySelector('#filter-discussed');
const filterDefaultButton = imgFiltersForm.querySelector('#filter-default');

const setDefaultclick = (cb) => {
  filterDefaultButton.addEventListener('click', ()=> {
    cb();
  });
};

const setDiscussedclick = (cb) => {
  filterDiscussedButton.addEventListener('click', ()=> {
    cb();
  });
};

const setRandomClick = (cb) => {
  filterRandomButton.addEventListener('click', ()=> {
    cb();
  });
};


imgFiltersForm.addEventListener('click', (evt) => {
  filterButtons.forEach((item) => {
    if(evt.target.id !== item.id) {
      item.classList.remove('img-filters__button--active');
    } else {
      item.classList.add('img-filters__button--active');
    }

  });
});

const showFilters = () => {
  const imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');
};

export {showFilters, setRandomClick, setDiscussedclick, setDefaultclick};

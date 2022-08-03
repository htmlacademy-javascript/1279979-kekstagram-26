
const imgFiltersForm = document.querySelector('.img-filters__form');
const filterButtons = imgFiltersForm.querySelectorAll('.img-filters__button');
const filterRandomButton = imgFiltersForm.querySelector('#filter-random');
const filterDiscussedButton = imgFiltersForm.querySelector('#filter-discussed');
const filterDefaultButton = imgFiltersForm.querySelector('#filter-default');

const setDefaultСlick = (cb) => {
  filterDefaultButton.addEventListener('click', () => {
    cb();
  });
};

const setDiscussedClick = (cb) => {
  filterDiscussedButton.addEventListener('click', () => {
    cb();
  });
};

const setRandomClick = (cb) => {
  filterRandomButton.addEventListener('click', () => {
    cb();
  });
};


imgFiltersForm.addEventListener('click', (evt) => {
  filterButtons.forEach((item) =>
    item.classList.toggle('img-filters__button--active', evt.target.id === item.id)
  );
});

const showFilters = () => {
  const imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');
};

export { showFilters, setRandomClick, setDiscussedClick, setDefaultСlick };

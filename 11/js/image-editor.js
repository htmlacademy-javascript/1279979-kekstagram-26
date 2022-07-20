import { convertStringPercentToNumber } from './utils.js';
const imageUploadForm = document.querySelector('.img-upload__form');
const scaleSmallerButton = imageUploadForm.querySelector('.scale__control--smaller');
const scaleBiggerButton = imageUploadForm.querySelector('.scale__control--bigger');
const scaleValueIpnut = imageUploadForm.querySelector('.scale__control--value');
const imgUploadPreview = imageUploadForm.querySelector('.img-upload__preview img');
const sliderElement = imageUploadForm.querySelector('.effect-level__slider');
const effectsList = imageUploadForm.querySelector('.effects__list');
const effectLevelValue = imageUploadForm.querySelector('.effect-level__value');

const STEP_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;


const setDefaultState = () => {
  imgUploadPreview.className = ('effects__preview--none');
  sliderElement.classList.add('hidden');
  imgUploadPreview.style = '';
  imageUploadForm.reset();
};

setDefaultState();


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const onChangeSmallerScale = () => {
  const number = convertStringPercentToNumber(scaleValueIpnut.value);
  const currentValue = `${number - STEP_SCALE_VALUE}%`;
  if(number > MIN_SCALE_VALUE) {
    scaleValueIpnut.value = currentValue;
    imgUploadPreview.style.transform = `scale(${convertStringPercentToNumber(currentValue) * 0.01})`;
  }
};


const onChangeBiggerScale = () => {
  const number = convertStringPercentToNumber(scaleValueIpnut.value);
  const currentValue = `${number + STEP_SCALE_VALUE}%`;
  if(number < MAX_SCALE_VALUE) {
    scaleValueIpnut.value = currentValue;
    imgUploadPreview.style.transform = `scale(${convertStringPercentToNumber(currentValue) * 0.01})`;
  }
};


effectsList.addEventListener('change', (evt) => {
  imgUploadPreview.className =  `effects__preview--${evt.target.value}`;
  sliderElement.classList.remove('hidden');
  if(evt.target.value === 'marvin') {
    sliderElement.noUiSlider.on('update', () => {
      effectLevelValue.value = sliderElement.noUiSlider.get();
      imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;

    });

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  } else if(evt.target.value === 'phobos') {
    sliderElement.noUiSlider.on('update', () => {
      effectLevelValue.value = sliderElement.noUiSlider.get();
      imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
    });

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  } else if(evt.target.value === 'heat') {
    sliderElement.noUiSlider.on('update', () => {
      effectLevelValue.value = sliderElement.noUiSlider.get();
      imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
    });

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  } else if (evt.target.value === 'chrome'){
    sliderElement.noUiSlider.on('update', () => {
      effectLevelValue.value = sliderElement.noUiSlider.get();
      imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
    });

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (evt.target.value === 'sepia') {
    sliderElement.noUiSlider.on('update', () => {
      effectLevelValue.value = sliderElement.noUiSlider.get();
      imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
    });

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if(evt.target.value === 'none') {
    imgUploadPreview.style.filter = '';
    sliderElement.classList.add('hidden');
  }
});


export {onChangeBiggerScale, onChangeSmallerScale,scaleSmallerButton,scaleBiggerButton, setDefaultState};

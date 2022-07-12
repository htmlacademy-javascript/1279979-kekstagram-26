import { convertStringToNumber } from './utils.js';
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

imgUploadPreview.classList.add('effects__preview--none');

const createHiddenInput = (name, value) => {
  const  hiddenInput = document.createElement('input');

  hiddenInput.type = 'hidden';
  hiddenInput.name = name;
  hiddenInput.value = value;
  imageUploadForm.append(hiddenInput);
};

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
  const number = convertStringToNumber(scaleValueIpnut.value);
  const currentValue = `${number - STEP_SCALE_VALUE}%`;
  if(number > MIN_SCALE_VALUE) {
    scaleValueIpnut.value = currentValue;
    imgUploadPreview.style.transform = `scale(${convertStringToNumber(currentValue) * 0.01})`;
  }
};


const onChangeBiggerScale = () => {
  const number = convertStringToNumber(scaleValueIpnut.value);
  const currentValue = `${number + STEP_SCALE_VALUE}%`;
  if(number < MAX_SCALE_VALUE) {
    scaleValueIpnut.value = currentValue;
    imgUploadPreview.style.transform = `scale(${convertStringToNumber(currentValue) * 0.01})`;
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
    createHiddenInput(evt.target.value, `${effectLevelValue.value}%`);

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
    createHiddenInput(evt.target.value, `${effectLevelValue.value}px`);

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
    createHiddenInput(evt.target.value, `${effectLevelValue.value}`);

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
    createHiddenInput(evt.target.value, `${effectLevelValue.value}`);

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
    createHiddenInput(evt.target.value, `${effectLevelValue.value}`);

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


export {onChangeBiggerScale, onChangeSmallerScale,scaleSmallerButton,scaleBiggerButton};

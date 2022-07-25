import { convertStringPercentToNumber } from './utils.js';
const imageUploadForm = document.querySelector('.img-upload__form');
const scaleSmallerButton = imageUploadForm.querySelector('.scale__control--smaller');
const scaleBiggerButton = imageUploadForm.querySelector('.scale__control--bigger');
const scaleValueIpnut = imageUploadForm.querySelector('.scale__control--value');
const imgUploadPreview = imageUploadForm.querySelector('.img-upload__preview img');
const sliderEffectLevel = imageUploadForm.querySelector('.img-upload__effect-level');
const sliderElement = imageUploadForm.querySelector('.effect-level__slider');
const effectsList = imageUploadForm.querySelector('.effects__list');
const effectLevel = imageUploadForm.querySelector('.effect-level__value');

// настройки масштабирования
const STEP_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;

// стандартные настройки слайдера
const MIN_SLIDER_DEFAULT_VALUE = 0;
const MAX_SLIDER_DEFAULT_VALUE = 1;
const START_SLIDER_DEFAULT_VALUE = 1;
const STEP_SLIDER_DEFAULT_VALUE = 0.1;

// настройки слайдера при эффекте marvin
const MAX_SLIDER_MARVIN_VALUE = 100;
const START_SLIDER_MARVIN_VALUE = 100;
const STEP_SLIDER_MARVIN_VALUE = 1;

// настройки слайдера при эффекте phobos
const MAX_SLIDER_PHOBOS_VALUE = 3;
const START_SLIDER_PHOBOS_VALUE = 3;

// настройки слайдера при эффекте heat
const MIN_SLIDER_HEAT_VALUE = 1;
const MAX_SLIDER_HEAT_VALUE = 3;
const STEP_SLIDER_HEAT_VALUE = 3;

// настройки стилей для эффектов
const effectSetting = {
  'marvin' : ['invert', '%'],
  'phobos' : ['blur', 'px'],
  'heat' : 'brightness',
  'chrome' : 'grayscale',
  'sepia' : 'sepia',
};

const setDefaultState = () => {
  imgUploadPreview.className = ('effects__preview--none');
  sliderElement.classList.add('hidden');
  imgUploadPreview.style = '';
  imageUploadForm.reset();
  sliderEffectLevel.classList.add('hidden');
};

setDefaultState();


noUiSlider.create(sliderElement, {
  range: {
    min: MIN_SLIDER_DEFAULT_VALUE,
    max: MAX_SLIDER_DEFAULT_VALUE,
  },
  start: START_SLIDER_DEFAULT_VALUE,
  step: STEP_SLIDER_DEFAULT_VALUE,
  connect: 'lower',
});

const onChangeSmallerScaleClick = () => {
  const number = convertStringPercentToNumber(scaleValueIpnut.value);
  const currentValue = `${number - STEP_SCALE_VALUE}%`;
  if(number > MIN_SCALE_VALUE) {
    scaleValueIpnut.value = currentValue;
    imgUploadPreview.style.transform = `scale(${convertStringPercentToNumber(currentValue) * 0.01})`;
  }
};


const onChangeBiggerScaleClick = () => {
  const number = convertStringPercentToNumber(scaleValueIpnut.value);
  const currentValue = `${number + STEP_SCALE_VALUE}%`;
  if(number < MAX_SCALE_VALUE) {
    scaleValueIpnut.value = currentValue;
    imgUploadPreview.style.transform = `scale(${convertStringPercentToNumber(currentValue) * 0.01})`;
  }
};

const showEffectFilter = (evt) => {
  const effect = evt.target.value;
  sliderElement.noUiSlider.on('update', () => {
    effectLevel.value = sliderElement.noUiSlider.get();
    if(effect === 'marvin' || effect === 'phobos') {
      imgUploadPreview.style.filter = `${effectSetting[effect][0]}(${effectLevel.value}${effectSetting[effect][1]})`;
    }
    imgUploadPreview.style.filter = `${effectSetting[effect]}(${effectLevel.value})`;
  });
};

const changeEffectFilter = (evt) => {
  const effect = evt.target.value;

  if(effect === 'marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MIN_SLIDER_DEFAULT_VALUE,
        max: MAX_SLIDER_MARVIN_VALUE,
      },
      start: START_SLIDER_MARVIN_VALUE,
      step: STEP_SLIDER_MARVIN_VALUE,
    });
    showEffectFilter(evt);
  } else if(effect === 'phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MIN_SLIDER_DEFAULT_VALUE,
        max: MAX_SLIDER_PHOBOS_VALUE,
      },
      start: START_SLIDER_PHOBOS_VALUE,
      step: STEP_SLIDER_DEFAULT_VALUE,
    });
    showEffectFilter(evt);
  } else if(effect === 'heat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MIN_SLIDER_HEAT_VALUE,
        max: MAX_SLIDER_HEAT_VALUE,
      },
      start: STEP_SLIDER_HEAT_VALUE,
      step: STEP_SLIDER_DEFAULT_VALUE,
    });
    showEffectFilter(evt);
  } else if(effect === 'chrome') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MIN_SLIDER_DEFAULT_VALUE,
        max: MAX_SLIDER_DEFAULT_VALUE,
      },
      start: START_SLIDER_DEFAULT_VALUE,
      step: STEP_SLIDER_DEFAULT_VALUE,
    });
    showEffectFilter(evt);
  } else if (effect === 'sepia') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MIN_SLIDER_DEFAULT_VALUE,
        max: MAX_SLIDER_DEFAULT_VALUE,
      },
      start: START_SLIDER_DEFAULT_VALUE,
      step: STEP_SLIDER_DEFAULT_VALUE,
    });
    showEffectFilter(evt);
  } else if(evt.target.value === 'none') {
    imgUploadPreview.style.filter = '';
    setDefaultState();
  }
};

const onEffectListChange = (evt) => {
  imgUploadPreview.className =  `effects__preview--${evt.target.value}`;
  sliderElement.classList.remove('hidden');
  sliderEffectLevel.classList.remove('hidden');
  changeEffectFilter(evt);
};
effectsList.addEventListener('change', onEffectListChange);


export {onChangeBiggerScaleClick, onChangeSmallerScaleClick,scaleSmallerButton,scaleBiggerButton, setDefaultState};

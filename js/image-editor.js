import { convertStringPercentToNumber } from './utils.js';
const imageUploadForm = document.querySelector('.img-upload__form');
const scaleSmallerButton = imageUploadForm.querySelector('.scale__control--smaller');
const scaleBiggerButton = imageUploadForm.querySelector('.scale__control--bigger');
const scaleValueIpnut = imageUploadForm.querySelector('.scale__control--value');
const imgUploadPreview = imageUploadForm.querySelector('.img-upload__preview img');
const sliderEffectLevel = imageUploadForm.querySelector('.img-upload__effect-level');
const sliderElement = imageUploadForm.querySelector('.effect-level__slider');
const effectsList = imageUploadForm.querySelector('.effects__list');
const effectLevelElem = imageUploadForm.querySelector('.effect-level__value');

// настройки масштабирования
const STEP_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;

const Params = {
  init: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  margin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    range: {
      min: 0,
      max: 100,
    },
    start: 1,
    step: 0.1,
  }
};

// настройки стилей для эффектов
const EffectSetting = {
  'marvin': ['invert', '%'],
  'phobos': ['blur', 'px'],
  'heat': ['brightness'],
  'chrome': ['grayscale'],
  'sepia': ['sepia', '%'],
};

const setDefaultState = () => {
  imgUploadPreview.className = ('effects__preview--none');
  sliderElement.classList.add('hidden');
  imgUploadPreview.style = '';
  imageUploadForm.reset();
  sliderEffectLevel.classList.add('hidden');
  imgUploadPreview.style.filter = '';
};

setDefaultState();

noUiSlider.create(sliderElement, Params.init);

const onChangeSmallerScaleClick = () => {
  const number = convertStringPercentToNumber(scaleValueIpnut.value);
  const currentValue = `${number - STEP_SCALE_VALUE}%`;
  if (number > MIN_SCALE_VALUE) {
    scaleValueIpnut.value = currentValue;
    imgUploadPreview.style.transform = `scale(${convertStringPercentToNumber(currentValue) * 0.01})`;
  }
};

const onChangeBiggerScaleClick = () => {
  const number = convertStringPercentToNumber(scaleValueIpnut.value);
  const currentValue = `${number + STEP_SCALE_VALUE}%`;
  if (number < MAX_SCALE_VALUE) {
    scaleValueIpnut.value = currentValue;
    imgUploadPreview.style.transform = `scale(${convertStringPercentToNumber(currentValue) * 0.01})`;
  }
};

let activeEffect = null;

sliderElement.noUiSlider.on('update', () => {
  const effectLevel = sliderElement.noUiSlider.get();
  const effect = EffectSetting[activeEffect];

  effectLevelElem.value = effectLevel;

  if (!effect) {
    return;
  }

  const [effectName, effectUnit = ''] = effect;

  imgUploadPreview.style.filter = `${effectName}(${effectLevel}${effectUnit})`;
});

const changeEffectFilter = (evt) => {
  activeEffect = evt.target.value;

  if (Params[activeEffect]) {
    sliderElement.noUiSlider.updateOptions(Params[activeEffect]);
    return;
  }

  setDefaultState();
};

const onEffectListChange = (evt) => {
  imgUploadPreview.className = `effects__preview--${evt.target.value}`;
  sliderElement.classList.remove('hidden');
  sliderEffectLevel.classList.remove('hidden');
  changeEffectFilter(evt);
};

effectsList.addEventListener('change', onEffectListChange);

export { onChangeBiggerScaleClick, onChangeSmallerScaleClick, scaleSmallerButton, scaleBiggerButton, setDefaultState };

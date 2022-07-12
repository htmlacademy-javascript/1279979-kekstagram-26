

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const checkStringLength = (string, length) => string.length <= length;

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const randomSort = (array) => array.sort(() => 0.5 - Math.random());

const getRandomMessage = (array) => randomSort(array).slice(0, getRandomPositiveInteger(1, 2)).join(' ');

const convertStringToNumber = (srt) => +srt.slice(0, -1);

export { getRandomPositiveInteger, checkStringLength, getRandomArrayElement, getRandomMessage, getRandomId , convertStringToNumber };





const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const checkStringLength = (string, length) => string.length <= length;

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const randomSort = (array) => array.sort(() => 0.5 - Math.random());

const getRandomMessage = (array) => randomSort(array).slice(0, getRandomPositiveInteger(1, 2)).join(' ');


export { getRandomPositiveInteger, checkStringLength, getRandomArrayElement, getRandomMessage, randomSort };



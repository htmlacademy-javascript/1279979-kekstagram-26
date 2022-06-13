import { ID_NUMBER_COUNTER } from './data.js';

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const checkStringLength = (string, length) => string.length <= length;

// Случайное неповторяющееся число


//Фишер–Йейтс перетасовка массива

const shuffle = (array) => {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

const getRandomNoRepeatNumber = (array) => {
  while (array.length < ID_NUMBER_COUNTER) {
    const number = Math.floor(Math.random() * 25) + 1;
    if (array.indexOf(number) === -1) {
      array.push(number);
    }
    return +array.pop();
  }
};
const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const getRandomMessage = (array) => {
  const newArr = shuffle(array).slice(0, getRandomPositiveInteger(1, 2)).join(' ');
  return newArr;
};

export { getRandomPositiveInteger, checkStringLength, getRandomNoRepeatNumber, getRandomArrayElement, getRandomMessage };



import { getRandomNoRepeatNumber, getRandomPositiveInteger, getRandomArrayElement, getRandomMessage } from './apps.js';
import { ID_NUMBERS, URL_NUMBERS, ID_COMMENT_NUMBERS, DESCRIPTIONS, MESSAGES, NAMES } from './data.js';


const getRandomPhotoDescription = () => ({
  id: getRandomNoRepeatNumber(ID_NUMBERS),
  url: `photos/${getRandomNoRepeatNumber(URL_NUMBERS)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({ length: 4 }, () => ({
    id: getRandomNoRepeatNumber(ID_COMMENT_NUMBERS),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomMessage(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }))
});


const similarPhotoDescription = Array.from({ length: 25 }, getRandomPhotoDescription);

console.log(similarPhotoDescription);


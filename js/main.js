import { getRandomPositiveInteger, getRandomArrayElement, getRandomMessage, randomSort } from './apps.js';
import { PHOTO_COUNTER, DESCRIPTIONS, MESSAGES, NAMES } from './data.js';


const getRandomPhotoDescription = (indexPhoto) => ({
  id: indexPhoto + 1,
  url: `photos/${indexPhoto + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({ length: 4 }, (indexComment) => ({
    id: indexComment + 1,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomMessage(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }))
});


const similarPhotoDescription = Array.from({ length: PHOTO_COUNTER }, getRandomPhotoDescription);

randomSort(similarPhotoDescription);


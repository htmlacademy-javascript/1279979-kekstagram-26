import { getRandomPositiveInteger, getRandomArrayElement, getRandomMessage, getRandomId } from './utils.js';

const PHOTO_COUNTER = 25;
const MAX_ID = 1000;

const DESCRIPTIONS = [
  'Если чётко сформулировать желание для Вселенной, то всё обязательно сбудется. Верьте в себя. Главное хотеть и мечтать..... / I\'ve bought some potatoes.',
  'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
  '#fun #party #cool #young',
  'Норм',
  'Вот это тачка! #wow #car #carwow #drive',
  'Тестим новую камеру! #camera #test #new #newcameratest #pic #photo #instaphoto',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
  'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка',
  'Затусили с друзьями на море #laptevsea #north #northeastpassage',
  'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём',
  'Иван',
  'Олег',
  'Денис',
  'Пётр',
  'Максим',
  'Александр',
  'Семён',
  'Игорь',
  'Василий',
];

const generateId = getRandomId(1, PHOTO_COUNTER);
const generatePhotoNumber = getRandomId(1, PHOTO_COUNTER);
const generateCommentId = getRandomId(1, MAX_ID);

const getRandomPhotoDescription = () => ({
  id: generateId(),
  url: `photos/${generatePhotoNumber()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({ length: 15 }, () => ({
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomMessage(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }))
});


const getSimilarPhotosDescriptions = () => Array.from({ length: PHOTO_COUNTER }, getRandomPhotoDescription);

export { getSimilarPhotosDescriptions };


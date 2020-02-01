'use strict';
var DESCRIPTIONS_NUMBER = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var COMMENTATOR_NAMES = ['Майкл Скотт', 'Пэм Биззли', 'Джим Халперт', 'Энди Бернард', 'Дуайт Шрут', 'Филлис Вэнс'];
var COMMENTS_NUMBER = 6;
var COMMENTATOR_MESSAGES = ['Всё отлично! В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
var MIN_COMMENT_NUMBER = 1;

var picturesListElement = document.querySelector('.pictures');
var pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (data) {
  return data[getRandomNumber(0, data.length - 1)];
};

var createComments = function (number) {
  var comments = [];
  for (var i = 0; i < number; i++) {
    comments[i] = {
      avatar: 'img/avatar-' + getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
      message: getRandomElement(COMMENTATOR_MESSAGES),
      name: getRandomElement(COMMENTATOR_NAMES)
    };
  }
  return comments;
};


var createPhotoDescriptions = function (number) {
  var userPhotoDescriotions = [];

  for (var i = 0; i < number; i++) {
    userPhotoDescriotions[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'здесь будет строка - описание фотографии',
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: createComments(getRandomNumber(MIN_COMMENT_NUMBER, COMMENTS_NUMBER))
    };
  }
  return userPhotoDescriotions;
};

var photos = createPhotoDescriptions(DESCRIPTIONS_NUMBER);

var fillPhotoTemplateWithData = function (data) {
  var descriptionElement = pictureTemplateElement.cloneNode(true);

  descriptionElement.querySelector('.picture__img').src = data.url;
  descriptionElement.querySelector('.picture__img').alt = data.description;
  descriptionElement.querySelector('.picture__comments').textContent = data.comments.length;
  descriptionElement.querySelector('.picture__likes').textContent = data.likes;

  return descriptionElement;
};

var addElements = function (picturesData) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < picturesData.length; i++) {
    fragment.appendChild(fillPhotoTemplateWithData(picturesData[i]));
  }
  picturesListElement.appendChild(fragment);
};

addElements(photos);

var fillBigPictureWithData = function (pictureData) {
  var bigPictureElement = document.querySelector('.big-picture');
  bigPictureElement.classList.remove('hidden');

  bigPictureElement.querySelector('.big-picture__img img').src = pictureData.url;
  bigPictureElement.querySelector('.likes-count').textContent = pictureData.likes;
  bigPictureElement.querySelector('.comments-count').textContent = pictureData.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = pictureData.description;
};

fillBigPictureWithData(photos[0]);

var commentsListElement = document.querySelector('.social__comments');
var commentTemplateElement = document.querySelector('.social__comment');

var createNewCommentElement = function (commentData) {
  var commentElement = commentTemplateElement.cloneNode(true);

  commentElement.querySelector('.social__picture').src = commentData.avatar;
  commentElement.querySelector('.social__picture').alt = commentData.name;
  commentElement.querySelector('.social__text').textContent = commentData.message;

  return commentElement;
};

commentsListElement.innerHTML = '';

var addCommentElements = function (commentData) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < commentData.length; i++) {
    fragment.appendChild(createNewCommentElement(commentData[i]));
  }
  commentsListElement.appendChild(fragment);
};

addCommentElements(photos[0].comments);

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');


document.querySelector('body').classList.add('modal-open');

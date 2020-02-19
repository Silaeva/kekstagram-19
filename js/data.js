'use strict';

(function () {
  var DESCRIPTIONS_NUMBER = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var COMMENTATOR_MESSAGES = [
    'Всё отлично! В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var COMMENTATOR_NAMES = ['Майкл Скотт', 'Пэм Биззли', 'Джим Халперт', 'Энди Бернард', 'Дуайт Шрут', 'Филлис Вэнс'];
  var MIN_COMMENT_NUMBER = 1;
  var COMMENTS_NUMBER = 6;
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;

  var createComments = function (number) {
    var comments = [];
    for (var i = 0; i < number; i++) {
      comments[i] = {
        avatar: 'img/avatar-' + window.utils.getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
        message: window.utils.getRandomElement(COMMENTATOR_MESSAGES),
        name: window.utils.getRandomElement(COMMENTATOR_NAMES)
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
        likes: window.utils.getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: createComments(window.utils.getRandomNumber(MIN_COMMENT_NUMBER, COMMENTS_NUMBER))
      };
    }
    return userPhotoDescriotions;
  };

  var photos = createPhotoDescriptions(DESCRIPTIONS_NUMBER);

  window.data = {
    photos: photos
  };
})();

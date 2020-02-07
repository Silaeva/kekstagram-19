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
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

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

var commentsListElement = document.querySelector('.social__comments');
var commentTemplateElement = document.querySelector('.social__comment');

var createNewCommentElement = function (commentData) {
  var commentElement = commentTemplateElement.cloneNode(true);

  commentElement.querySelector('.social__picture').src = commentData.avatar;
  commentElement.querySelector('.social__picture').alt = commentData.name;
  commentElement.querySelector('.social__text').textContent = commentData.message;

  return commentElement;
};

var addCommentElements = function (commentData) {
  commentsListElement.innerHTML = '';
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < commentData.length; i++) {
    fragment.appendChild(createNewCommentElement(commentData[i]));
  }
  commentsListElement.appendChild(fragment);
};

var fillBigPictureWithData = function (pictureData) {
  var bigPictureElement = document.querySelector('.big-picture');
  // bigPictureElement.classList.remove('hidden');

  bigPictureElement.querySelector('.big-picture__img img').src = pictureData.url;
  bigPictureElement.querySelector('.likes-count').textContent = pictureData.likes;
  bigPictureElement.querySelector('.comments-count').textContent = pictureData.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = pictureData.description;

  addCommentElements(pictureData.comments);
};

fillBigPictureWithData(photos[0]);

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');


// document.querySelector('body').classList.add('modal-open');

// Загрузка изображения и показ формы редактирования

var editStartElement = document.querySelector('.img-upload__input');
var editFormElement = document.querySelector('.img-upload__overlay');
var editFormCloseElement = editFormElement.querySelector('.img-upload__cancel');

var editFormEscPressHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    closeEditForm();
  }
};

var openEditForm = function () {
  editFormElement.classList.remove('hidden');
  document.addEventListener('keydown', editFormEscPressHandler);
  document.querySelector('body').classList.add('modal-open');
  editFormElement.addEventListener('change', editedPhotoChangeHandler);
  effectToggleElement.addEventListener('mouseup', toggleMouseUpHandler);
  effectBar.classList.add('hidden');
};

var closeEditForm = function () {
  editFormElement.classList.add('hidden');
  document.removeEventListener('keydown', editFormEscPressHandler);
  editStartElement.value = '';
  document.querySelector('body').classList.remove('modal-open');
  editFormElement.removeEventListener('change', editedPhotoChangeHandler);
  effectToggleElement.removeEventListener('mouseup', toggleMouseUpHandler);
};

editStartElement.addEventListener('change', function (evt) {
  evt.preventDefault();
  openEditForm();
});

editStartElement.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openEditForm();
  }
});

editFormCloseElement.addEventListener('click', function () {
  closeEditForm();
});

editFormCloseElement.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closeEditForm();
  }
});

// Редактирование изображения и ограничения, накладываемые на поля

var editedPhoto = document.querySelector('.img-upload__preview img');
// var editFormElement = document.querySelector('.img-upload__overlay'); // ФОРМА где слушать клики/ уже объявлена выше
var effectBar = document.querySelector('.img-upload__effect-level');
var effectToggleElement = document.querySelector('.effect-level__pin');
var effectDepthElement = document.querySelector('.effect-level__depth');

var editedPhotoChangeHandler = function (evt) {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    editedPhoto.className = '';
    if (evt.target.matches('input[value="none"]')) {
      effectBar.classList.add('hidden');
    } else {
      effectBar.classList.remove('hidden');
      editedPhoto.classList.add('effects__preview--' + evt.target.value);
      effectToggleElement.style.left = 100 + '%';
      effectDepthElement.style.width = 100 + '%';
    }
  }
};

var toggleMouseUpHandler = function () {
  effectToggleElement.style.left = POSITION_OF_TOGGLE + '%';
  effectDepthElement.style.width = POSITION_OF_TOGGLE + '%';
  if (('input[value="chrome"]').checked) {
    editedPhoto.style.filter = chromFilter;
  } else if (('input[value="sepia"]').checked) {
    editedPhoto.style.filter = sepiaFilter;
  } else if (('input[value="marvin"]').checked) {
    editedPhoto.style.filter = marvinFilter;
  } else if (('input[value="phobos"]').checked) {
    editedPhoto.style.filter = phobosFilter;
  } else if (('input[value="heat"]').checked) {
    editedPhoto.style.filter = heatFilter;
  }
};

var POSITION_OF_TOGGLE = 20;

var getChromFilter = function (value) {
  var maxValue = 1;
  var chromLevel = value * maxValue / 100;
  return 'grayscale(' + chromLevel + ')';
};

var chromFilter = getChromFilter(POSITION_OF_TOGGLE);

var getSepiaFilter = function (value) {
  var maxValue = 1;
  var sepiaLevel = value * maxValue / 100;
  return 'sepia(' + sepiaLevel + ')';
};

var sepiaFilter = getSepiaFilter(POSITION_OF_TOGGLE);

var getMarvinFilter = function (value) {
  return 'invert(' + value + '%)';
};

var marvinFilter = getMarvinFilter(POSITION_OF_TOGGLE);

var getPhobosFilter = function (value) {
  var maxValue = 3;
  var phobosLevel = value * maxValue / 100;
  return 'blur(' + phobosLevel + 'px)';
};

var phobosFilter = getPhobosFilter(POSITION_OF_TOGGLE);

var getHeatFilter = function (value) {
  var minValue = 1;
  var maxValue = 3;
  var heatLevel = minValue + (value * (maxValue - minValue) / 100);
  return 'brightness(' + heatLevel + ')';
};

var heatFilter = getHeatFilter(POSITION_OF_TOGGLE);

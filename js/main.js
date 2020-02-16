'use strict';
var DESCRIPTIONS_NUMBER = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var COMMENTATOR_NAMES = ['Майкл Скотт', 'Пэм Биззли', 'Джим Халперт', 'Энди Бернард', 'Дуайт Шрут', 'Филлис Вэнс'];
var COMMENTS_NUMBER = 6;
var COMMENTATOR_MESSAGES = [
  'Всё отлично! В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
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
  bigPictureElement.classList.remove('hidden');

  bigPictureElement.querySelector('.big-picture__img img').src = pictureData.url;
  bigPictureElement.querySelector('.likes-count').textContent = pictureData.likes;
  bigPictureElement.querySelector('.comments-count').textContent = pictureData.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = pictureData.description;

  addCommentElements(pictureData.comments);
  document.querySelector('body').classList.add('modal-open');

  closeBigPictureElement.addEventListener('click', closeBigPictureClickHandler);
  document.addEventListener('keydown', bigPictureEscHandler);
};

var closeBigPicture = function () {
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  closeBigPictureElement.removeEventListener('click', closeBigPictureClickHandler);
  document.removeEventListener('keydown', bigPictureEscHandler);
};

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');

var usersPictures = document.querySelectorAll('.picture');
var closeBigPictureElement = document.querySelector('.big-picture__cancel');

var closeBigPictureClickHandler = function () {
  closeBigPicture();
};

var bigPictureEscHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    closeBigPicture();
  }
};

var addPictureClickHandler = function (userPic, photo) {
  userPic.addEventListener('click', function () {
    fillBigPictureWithData(photo);
  });
};

var addClickHandlers = function (pictureArray, dataArray) {
  for (var j = 0; j < pictureArray.length; j++) {
    addPictureClickHandler(pictureArray[j], dataArray[j]);
  }
};

addClickHandlers(usersPictures, photos);

// Загрузка изображения и показ формы редактирования

var editStartElement = document.querySelector('.img-upload__input');
var editFormElement = document.querySelector('.img-upload__overlay');
var editFormCloseElement = editFormElement.querySelector('.img-upload__cancel');

var editFormEscPressHandler = function (evt) {
  var active = document.activeElement;
  if (hashtagInputElement !== active && commentInputElement !== active && evt.key === ESC_KEY) {
    closeEditForm();
  }
};

var openEditForm = function () {
  editFormElement.classList.remove('hidden');
  document.addEventListener('keydown', editFormEscPressHandler);
  document.querySelector('body').classList.add('modal-open');
  editFormElement.addEventListener('change', editedPhotoElementChangeHandler);
  effectToggleElement.addEventListener('mouseup', toggleMouseUpHandler);
  effectBarElement.classList.add('hidden');
  scaleSmallerElement.addEventListener('click', scaleSmallerClickHandler);
  scaleBiggerElement.addEventListener('click', scaleBiggerClickHandler);
  hashtagInputElement.addEventListener('input', hashtagInputHandler);
};

var closeEditForm = function () {
  editFormElement.classList.add('hidden');
  document.removeEventListener('keydown', editFormEscPressHandler);
  editStartElement.value = '';
  editedPhotoElement.style.filter = '';
  editedPhotoElement.style.transform = '';
  scaleValueElement.value = 100 + '%';
  editedPhotoElement.classList.remove('effects__preview--' + currentFilter);
  document.querySelector('body').classList.remove('modal-open');
  editFormElement.removeEventListener('change', editedPhotoElementChangeHandler);
  effectToggleElement.removeEventListener('mouseup', toggleMouseUpHandler);
  scaleSmallerElement.removeEventListener('click', scaleSmallerClickHandler);
  scaleBiggerElement.removeEventListener('click', scaleBiggerClickHandler);
  hashtagInputElement.removeEventListener('input', hashtagInputHandler);
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

// Фильтры

var POSITION_OF_TOGGLE = 20;
var MAX_VALUE_CHROME = 1;
var MAX_VALUE_SEPIA = 1;
var MAX_VALUE_PHOBOS = 3;
var MIN_VALUE_HEAT = 1;
var MAX_VALUE_HEAT = 3;

var editedPhotoElement = editFormElement.querySelector('.img-upload__preview img');
var effectBarElement = editFormElement.querySelector('.img-upload__effect-level');
var effectToggleElement = editFormElement.querySelector('.effect-level__pin');
var effectDepthElement = editFormElement.querySelector('.effect-level__depth');
var effectLevelValue = editFormElement.querySelector('effect-level__value');

var currentFilter;

var editedPhotoElementChangeHandler = function (evt) {
  if (evt.target.matches('input[type="radio"]')) {
    editedPhotoElement.style.filter = '';
    editedPhotoElement.classList.remove('effects__preview--' + currentFilter);
    currentFilter = evt.target.value;
    if (evt.target.matches('input[value="none"]')) {
      effectBarElement.classList.add('hidden');
    } else {
      effectBarElement.classList.remove('hidden');
      editedPhotoElement.classList.add('effects__preview--' + currentFilter);
      effectToggleElement.style.left = 100 + '%';
      effectDepthElement.style.width = 100 + '%';
      effectLevelValue.value = 100 + '%';
    }
  }
};

var getChromeFilter = function (value) {
  var chromeLevel = value * MAX_VALUE_CHROME / 100;
  return 'grayscale(' + chromeLevel + ')';
};

var getSepiaFilter = function (value) {
  var sepiaLevel = value * MAX_VALUE_SEPIA / 100;
  return 'sepia(' + sepiaLevel + ')';
};

var getMarvinFilter = function (value) {
  return 'invert(' + value + '%)';
};

var getPhobosFilter = function (value) {
  var phobosLevel = value * MAX_VALUE_PHOBOS / 100;
  return 'blur(' + phobosLevel + 'px)';
};

var getHeatFilter = function (value) {
  var heatLevel = MIN_VALUE_HEAT + (value * (MAX_VALUE_HEAT - MIN_VALUE_HEAT) / 100);
  return 'brightness(' + heatLevel + ')';
};

var filterFunction = {
  'chrome': getChromeFilter,
  'sepia': getSepiaFilter,
  'marvin': getMarvinFilter,
  'phobos': getPhobosFilter,
  'heat': getHeatFilter,
};

var toggleMouseUpHandler = function () {
  effectToggleElement.style.left = POSITION_OF_TOGGLE + '%';
  effectDepthElement.style.width = POSITION_OF_TOGGLE + '%';
  editedPhotoElement.style.filter = filterFunction[currentFilter](POSITION_OF_TOGGLE);
  effectLevelValue.value = POSITION_OF_TOGGLE;
};

// масштабирование

var SCALE_STEP = 25;
var SCALE_VALUE_MIN = 25;
var SCALE_VALUE_MAX = 100;

var scaleSmallerElement = editFormElement.querySelector('.scale__control--smaller');
var scaleBiggerElement = editFormElement.querySelector('.scale__control--bigger');
var scaleValueElement = editFormElement.querySelector('.scale__control--value');


var getScaleValue = function () {
  return parseInt(scaleValueElement.value, 10);
};

var getScaleValueInRange = function (value) {
  return Math.min(SCALE_VALUE_MAX, Math.max(SCALE_VALUE_MIN, value));
};

var scaleSmallerClickHandler = function () {
  var currentScaleValue = getScaleValue();
  var newScaleValue = getScaleValueInRange(currentScaleValue - SCALE_STEP);
  scaleValueElement.value = newScaleValue + '%';
  editedPhotoElement.style.transform = 'scale(' + (newScaleValue / 100) + ')';
};

var scaleBiggerClickHandler = function () {
  var currentScaleValue = getScaleValue();
  var newScaleValue = getScaleValueInRange(currentScaleValue + SCALE_STEP);
  scaleValueElement.value = newScaleValue + '%';
  editedPhotoElement.style.transform = 'scale(' + (newScaleValue / 100) + ')';
};

// валидация

var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAG_LENGTH = 20;
var MAX_HASHTAG_NUMBER = 5;

var hashtagInputElement = editFormElement.querySelector('.text__hashtags');
var commentInputElement = editFormElement.querySelector('.text__description');

var isUniqueArray = function (array) {
  var unique = {};

  for (var i = 0; i < array.length; i++) {
    var current = array[i];
    if (unique[current]) {
      return false;
    }
    unique[current] = true;
  }
  return true;
};

var isContainSymbols = function (word) {
  return word.match(/^#[a-zA-Z0-9а-яА-Я]+$/);
};

var getInvalidityMessage = function (array) {
  var message = '';

  if (array.length > MAX_HASHTAG_NUMBER) {
    message = 'Должно быть не более ' + MAX_HASHTAG_NUMBER + ' хэш-тегов';
    return message;
  }
  if (!isUniqueArray(array)) {
    message = 'Хэш-теги не должны повторяться (хэш-теги нечувствительны к регистру)';
    return message;
  }

  for (var i = 0; i < array.length; i++) {
    if (array[i].length === 1 && array[i] === '#') {
      message = 'Хэш-тег не может состоять только из решётки';
      return message;
    } else if (!isContainSymbols(array[i])) {
      message = 'Хэш-тег ' + array[i] + ' должен начинаться с символа решетки и состоять только из букв и цифр';
      return message;
    } else if (array[i].length < MIN_HASHTAG_LENGTH) {
      message = 'Хэш-тег ' + array[i] + ' должен состоять минимум из ' + MIN_HASHTAG_LENGTH + ' символов';
      return message;
    } else if (array[i].length > MAX_HASHTAG_LENGTH) {
      message = 'Хэш-тег должен состоять максимум из ' + MAX_HASHTAG_LENGTH + ' символов';
      return message;
    }
  }
  return message;
};

var hashtagInputHandler = function (evt) {
  var hashtags = hashtagInputElement.value.toLowerCase().split(' ');
  evt.target.setCustomValidity(getInvalidityMessage(hashtags));
};

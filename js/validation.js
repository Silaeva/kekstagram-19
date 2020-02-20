'use strict';

(function () {
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAG_NUMBER = 5;

  var editFormElement = document.querySelector('.img-upload__overlay');
  var hashtagInputElement = editFormElement.querySelector('.text__hashtags');

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

  var addHandlers = function () {
    hashtagInputElement.addEventListener('input', hashtagInputHandler);
  };

  var removeHandlers = function () {
    hashtagInputElement.removeEventListener('input', hashtagInputHandler);
  };

  window.validation = {
    addHandlers: addHandlers,
    removeHandlers: removeHandlers
  };
})();

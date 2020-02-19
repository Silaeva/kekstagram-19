'use strict';

(function () {
  var POSITION_OF_TOGGLE = 20;
  var MAX_VALUE_CHROME = 1;
  var MAX_VALUE_SEPIA = 1;
  var MAX_VALUE_PHOBOS = 3;
  var MIN_VALUE_HEAT = 1;
  var MAX_VALUE_HEAT = 3;

  var editFormElement = document.querySelector('.img-upload__overlay');
  var editedPhotoElement = editFormElement.querySelector('.img-upload__preview img');
  var effectBarElement = editFormElement.querySelector('.img-upload__effect-level');
  var effectToggleElement = editFormElement.querySelector('.effect-level__pin');
  var effectDepthElement = editFormElement.querySelector('.effect-level__depth');
  var effectLevelValue = editFormElement.querySelector('.effect-level__value');

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

  var getCurrentFilter = function () {
    return currentFilter;
  };

  window.editing = {
    scaleSmallerClickHandler: scaleSmallerClickHandler,
    scaleBiggerClickHandler: scaleBiggerClickHandler,
    editedPhotoElementChangeHandler: editedPhotoElementChangeHandler,
    toggleMouseUpHandler: toggleMouseUpHandler,
    currentFilter: getCurrentFilter
  };
})();

'use strict';

(function () {
  var editStartElement = document.querySelector('.img-upload__input');
  var editFormElement = document.querySelector('.img-upload__overlay');
  var editFormCloseElement = editFormElement.querySelector('.img-upload__cancel');
  var scaleSmallerElement = editFormElement.querySelector('.scale__control--smaller');
  var scaleBiggerElement = editFormElement.querySelector('.scale__control--bigger');
  var effectBarElement = editFormElement.querySelector('.img-upload__effect-level');
  var effectToggleElement = editFormElement.querySelector('.effect-level__pin');
  var editedPhotoElement = editFormElement.querySelector('.img-upload__preview img');
  var scaleValueElement = editFormElement.querySelector('.scale__control--value');
  var commentInputElement = editFormElement.querySelector('.text__description');
  var hashtagInputElement = editFormElement.querySelector('.text__hashtags');

  var editFormEscPressHandler = function (evt) {
    var active = document.activeElement;
    if (hashtagInputElement !== active && commentInputElement !== active && evt.key === window.utils.ESC_KEY) {
      closeEditForm();
    }
  };

  var openEditForm = function () {
    editFormElement.classList.remove('hidden');
    document.addEventListener('keydown', editFormEscPressHandler);
    document.querySelector('body').classList.add('modal-open');
    editFormElement.addEventListener('change', window.editing.editedPhotoElementChangeHandler);
    effectToggleElement.addEventListener('mouseup', window.editing.toggleMouseUpHandler);
    effectBarElement.classList.add('hidden');
    scaleSmallerElement.addEventListener('click', window.editing.scaleSmallerClickHandler);
    scaleBiggerElement.addEventListener('click', window.editing.scaleBiggerClickHandler);
    hashtagInputElement.addEventListener('input', window.validation.hashtagInputHandler);
  };

  var closeEditForm = function () {
    editFormElement.classList.add('hidden');
    document.removeEventListener('keydown', editFormEscPressHandler);
    editStartElement.value = '';
    editedPhotoElement.style.filter = '';
    editedPhotoElement.style.transform = '';
    scaleValueElement.value = 100 + '%';
    editedPhotoElement.classList.remove('effects__preview--' + window.editing.currentFilter);
    document.querySelector('body').classList.remove('modal-open');
    editFormElement.removeEventListener('change', window.editing.editedPhotoElementChangeHandler);
    effectToggleElement.removeEventListener('mouseup', window.editing.toggleMouseUpHandler);
    scaleSmallerElement.removeEventListener('click', window.editing.scaleSmallerClickHandler);
    scaleBiggerElement.removeEventListener('click', window.editing.scaleBiggerClickHandler);
    hashtagInputElement.removeEventListener('input', window.validation.hashtagInputHandler);
  };

  editStartElement.addEventListener('change', function (evt) {
    evt.preventDefault();
    openEditForm();
  });

  editStartElement.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openEditForm);
  });

  editFormCloseElement.addEventListener('click', function () {
    closeEditForm();
  });

  editFormCloseElement.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closeEditForm);
  });
})();

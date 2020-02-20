'use strict';

(function () {
  var editStartElement = document.querySelector('.img-upload__input');
  var editFormElement = document.querySelector('.img-upload__overlay');
  var editFormCloseElement = editFormElement.querySelector('.img-upload__cancel');
  var effectBarElement = editFormElement.querySelector('.img-upload__effect-level');
  var editedPhotoElement = editFormElement.querySelector('.img-upload__preview img');
  var scaleValueElement = editFormElement.querySelector('.scale__control--value');
  var commentInputElement = editFormElement.querySelector('.text__description');
  var hashtagInputElement = editFormElement.querySelector('.text__hashtags');

  var editFormEscPressHandler = function (evt) {
    var active = document.activeElement;
    if (hashtagInputElement !== active && commentInputElement !== active) {
      window.utils.isEnterEvent(evt, closeEditForm);
    }
  };

  var openEditForm = function () {
    editFormElement.classList.remove('hidden');
    document.addEventListener('keydown', editFormEscPressHandler);
    document.querySelector('body').classList.add('modal-open');
    effectBarElement.classList.add('hidden');
    window.editing.addHandlers();
    window.validation.addHandlers();
  };

  var closeEditForm = function () {
    editFormElement.classList.add('hidden');
    document.removeEventListener('keydown', editFormEscPressHandler);
    editStartElement.value = '';
    editedPhotoElement.style.filter = '';
    editedPhotoElement.style.transform = '';
    scaleValueElement.value = 100 + '%';
    document.querySelector('body').classList.remove('modal-open');
    window.editing.removeHandlers();
    window.validation.removeHandlers();
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

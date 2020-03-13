'use strict';

(function () {
  var DEFAULT_VALUE = 100;
  var formElement = document.querySelector('.img-upload__form');
  var fileChooserElement = document.querySelector('.img-upload__input');
  var editFormElement = document.querySelector('.img-upload__overlay');
  var editFormCloseElement = editFormElement.querySelector('.img-upload__cancel');
  var effectBarElement = editFormElement.querySelector('.img-upload__effect-level');
  var editedPhotoElement = editFormElement.querySelector('.img-upload__preview img');
  var scaleValueElement = editFormElement.querySelector('.scale__control--value');
  var commentInputElement = editFormElement.querySelector('.text__description');
  var hashtagInputElement = editFormElement.querySelector('.text__hashtags');
  var inputOriginalElement = editFormElement.querySelector('[value="none"]');

  var editFormEscPressHandler = function (evt) {
    var active = document.activeElement;
    if (hashtagInputElement !== active && commentInputElement !== active) {
      window.utils.isEscEvent(evt, closeEditForm);
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
    fileChooserElement.value = '';
    editedPhotoElement.style.filter = '';
    editedPhotoElement.style.transform = '';
    scaleValueElement.value = DEFAULT_VALUE + '%';
    hashtagInputElement.value = '';
    commentInputElement.value = '';
    inputOriginalElement.checked = true;
    document.querySelector('body').classList.remove('modal-open');
    window.editing.removeHandlers();
    window.validation.removeHandlers();
    formElement.removeEventListener('submit', formSubmitHandler);
    fileChooserElement.removeEventListener('change', window.uploadPhoto.fileChangeHandler);
  };

  fileChooserElement.addEventListener('change', function (evt) {
    evt.preventDefault();
    openEditForm();
  });

  fileChooserElement.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openEditForm);
  });

  editFormCloseElement.addEventListener('click', function () {
    closeEditForm();
  });

  editFormCloseElement.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closeEditForm);
  });

  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');
  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var createResultMessage = function (template, message) {
    var messageElement = template.cloneNode(true);

    if (message) {
      var messageTitle = messageElement.querySelector('.error__title');
      messageTitle.textContent = message;
    }
    main.appendChild(messageElement);
  };

  var successHandler = function () {
    closeEditForm();
    createResultMessage(successTemplateElement);

    var successLayerElement = document.querySelector('.success');
    var messageButtonElement = successLayerElement.querySelector('.success__button');
    var successInnerElement = successLayerElement.querySelector('.success__inner');
    document.addEventListener('keydown', successMessageEscHandler);
    messageButtonElement.addEventListener('click', function () {
      closeSuccessMessage();
    });
    successLayerElement.addEventListener('click', function (evt) {
      if (evt.target !== successInnerElement) {
        closeSuccessMessage();
      }
    });
  };

  var closeSuccessMessage = function () {
    var successLayerElement = document.querySelector('.success');
    main.removeChild(successLayerElement);
    document.removeEventListener('keydown', successMessageEscHandler);
  };

  var successMessageEscHandler = function (evt) {
    window.utils.isEscEvent(evt, closeSuccessMessage);
  };

  var errorHandler = function (message) {
    closeEditForm();
    createResultMessage(errorTemplateElement, message);

    var errorLayerElement = document.querySelector('.error');
    var messageButtonElement = errorLayerElement.querySelector('.error__button');
    var errorInnerElement = errorLayerElement.querySelector('.error__inner');
    document.addEventListener('keydown', errorMessageEscHandler);
    messageButtonElement.addEventListener('click', function () {
      closeErrorMessage();
    });
    errorLayerElement.addEventListener('click', function (evt) {
      if (evt.target !== errorInnerElement) {
        closeErrorMessage();
      }
    });
  };

  var closeErrorMessage = function () {
    var errorLayerElement = document.querySelector('.error');
    main.removeChild(errorLayerElement);
    document.removeEventListener('keydown', errorMessageEscHandler);
  };

  var errorMessageEscHandler = function (evt) {
    window.utils.isEscEvent(evt, closeErrorMessage);
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formElement), successHandler, errorHandler);
  };

  formElement.addEventListener('submit', formSubmitHandler);

  window.form = {
    createResultMessage: createResultMessage,
    errorMessageEscHandler: errorMessageEscHandler,
    closeErrorMessage: closeErrorMessage
  };
})();

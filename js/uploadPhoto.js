'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserElement = document.querySelector('.img-upload__input');
  var editFormElement = document.querySelector('.img-upload__overlay');
  var editedPhotoElement = editFormElement.querySelector('.img-upload__preview img');

  var fileChangeHandler = function () {
    var file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        editedPhotoElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  fileChooserElement.addEventListener('change', fileChangeHandler);

  window.uploadPhoto = {
    fileChooserElement: fileChooserElement
  };
})();

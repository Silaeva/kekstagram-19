'use strict';

(function () {
  var editFormElement = document.querySelector('.img-upload__overlay');
  var effectToggleElement = editFormElement.querySelector('.effect-level__pin');
  var effectLevelLineElement = editFormElement.querySelector('.effect-level__line');
  var effectDepthElement = editFormElement.querySelector('.effect-level__depth');
  var editedPhotoElement = editFormElement.querySelector('.img-upload__preview img');
  var effectLevelValue = editFormElement.querySelector('.effect-level__value');

  effectToggleElement.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var toggleMouseMoveHandler = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var togglePositionX = effectToggleElement.offsetLeft - shift.x;

      var toggleValue = Math.round(togglePositionX * 100 / effectLevelLineElement.offsetWidth);

      if (!(togglePositionX < 0 || togglePositionX > effectLevelLineElement.offsetWidth)) {
        effectToggleElement.style.left = toggleValue + '%';
        effectDepthElement.style.width = toggleValue + '%';
        effectLevelValue.value = toggleValue;
        editedPhotoElement.style.filter = window.editing.filterFunction[window.editing.getCurrentFilter()](toggleValue);
      }
    };

    var toggleMouseUpHandler = function () {
      document.removeEventListener('mousemove', toggleMouseMoveHandler);
      document.removeEventListener('mouseup', toggleMouseUpHandler);
    };

    document.addEventListener('mousemove', toggleMouseMoveHandler);
    document.addEventListener('mouseup', toggleMouseUpHandler);

  });
})();

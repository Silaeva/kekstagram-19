'use strict';

(function () {

  var usersPictures = document.querySelectorAll('.picture');
  var bigPictureElement = document.querySelector('.big-picture');


  var addCommentElements = function (commentData, element) {
    element.innerHTML = '';
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < commentData.length; i++) {
      fragment.appendChild(window.gallery.createNewCommentElement(commentData[i]));
    }
    element.appendChild(fragment);
  };

  var fillBigPictureWithData = function (pictureData) {
    var newBigPictureElement = bigPictureElement.cloneNode(true);

    newBigPictureElement.querySelector('.big-picture__img img').src = pictureData.url;
    newBigPictureElement.querySelector('.likes-count').textContent = pictureData.likes;
    newBigPictureElement.querySelector('.comments-count').textContent = pictureData.comments.length;
    newBigPictureElement.querySelector('.social__caption').textContent = pictureData.description;

    var commentsListElement = newBigPictureElement.querySelector('.social__comments');
    addCommentElements(pictureData.comments, commentsListElement);

    bigPictureElement.replaceWith(newBigPictureElement);
    newBigPictureElement.classList.remove('hidden');
    bigPictureElement = newBigPictureElement;

    document.querySelector('body').classList.add('modal-open');
    newBigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
    newBigPictureElement.querySelector('.comments-loader').classList.add('hidden');

    var closeBigPictureElement = newBigPictureElement.querySelector('.big-picture__cancel');
    closeBigPictureElement.addEventListener('click', closeBigPictureClickHandler);
    document.addEventListener('keydown', bigPictureEscHandler);
  };

  var closeBigPicture = function () {
    bigPictureElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', bigPictureEscHandler);
  };

  var closeBigPictureClickHandler = function () {
    closeBigPicture();
  };

  var bigPictureEscHandler = function (evt) {
    window.utils.isEscEvent(evt, closeBigPicture);
  };

  var addPictureClickHandler = function (userPic, photo) {
    userPic.addEventListener('click', function () {
      fillBigPictureWithData(photo);
    });
  };

  var addClickHandlers = function (pictures, data) {
    for (var j = 0; j < pictures.length; j++) {
      addPictureClickHandler(pictures[j], data[j]);
    }
  };

  addClickHandlers(usersPictures, window.data.photos);

})();

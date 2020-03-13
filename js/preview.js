'use strict';

(function () {
  var START_COMMENTS_NUMBER = 5;
  var bigPictureElement = document.querySelector('.big-picture');

  var showedComments = 0;

  var addComments = function (container, comments, commentData) {
    container.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments; i++) {
      fragment.appendChild(window.gallery.createNewCommentElement(commentData[i]));
    }
    container.appendChild(fragment);
  };

  var addFirstComments = function (commentData, container) {
    showedComments = Math.min(commentData.length, START_COMMENTS_NUMBER);
    addComments(container, showedComments, commentData);
  };

  var loadOtherComments = function (commentData, container, button) {

    if ((commentData.length - showedComments) > START_COMMENTS_NUMBER) {
      showedComments += START_COMMENTS_NUMBER;
      addComments(container, showedComments, commentData);
    } else if ((commentData.length - showedComments) <= START_COMMENTS_NUMBER) {
      showedComments = commentData.length;
      button.classList.add('hidden');
      addComments(container, showedComments, commentData);
    }
  };

  var fillBigPictureWithData = function (pictureData) {
    document.querySelector('body').classList.add('modal-open');
    var newBigPictureElement = bigPictureElement.cloneNode(true);

    newBigPictureElement.querySelector('.big-picture__img img').src = pictureData.url;
    newBigPictureElement.querySelector('.likes-count').textContent = pictureData.likes;
    newBigPictureElement.querySelector('.social__caption').textContent = pictureData.description;

    var commentsListElement = newBigPictureElement.querySelector('.social__comments');
    addFirstComments(pictureData.comments, commentsListElement);

    bigPictureElement.replaceWith(newBigPictureElement);
    newBigPictureElement.classList.remove('hidden');
    bigPictureElement = newBigPictureElement;

    newBigPictureElement.querySelector('.showed-comments').textContent = showedComments;
    newBigPictureElement.querySelector('.comments-count').textContent = pictureData.comments.length;

    var loadCommentsBtnElement = newBigPictureElement.querySelector('.comments-loader');
    loadCommentsBtnElement.classList.remove('hidden');
    if (pictureData.comments.length < START_COMMENTS_NUMBER) {
      loadCommentsBtnElement.classList.add('hidden');
    }
    loadCommentsBtnElement.addEventListener('click', function () {
      loadOtherComments(pictureData.comments, commentsListElement, loadCommentsBtnElement);
      newBigPictureElement.querySelector('.showed-comments').textContent = showedComments;
    });
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

  window.preview = {
    addClickHandlers: addClickHandlers
  };
})();

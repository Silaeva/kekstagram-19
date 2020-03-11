'use strict';

(function () {
  var START_COMMENTS_NUMBER = 5;
  var bigPictureElement = document.querySelector('.big-picture');

  var showedComments = 0;

  var addFirstComments = function (commentData, container) {
    container.innerHTML = '';
    showedComments = Math.min(commentData.length, START_COMMENTS_NUMBER);
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < showedComments; i++) {
      fragment.appendChild(window.gallery.createNewCommentElement(commentData[i]));
    }
    container.appendChild(fragment);
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

    newBigPictureElement.querySelector('.social__comment-count').textContent = showedComments + ' из ' + pictureData.comments.length + ' комментариев';

    var loadCommentsBtnElement = newBigPictureElement.querySelector('.comments-loader');
    loadCommentsBtnElement.classList.remove('hidden');
    if (pictureData.comments.length < START_COMMENTS_NUMBER) {
      loadCommentsBtnElement.classList.add('hidden');
    }
    loadCommentsBtnElement.addEventListener('click', function () {
      loadOtherComments(pictureData.comments, commentsListElement, loadCommentsBtnElement);
      newBigPictureElement.querySelector('.social__comment-count').textContent = showedComments + ' из ' + pictureData.comments.length + ' комментариев';
    });
    var closeBigPictureElement = newBigPictureElement.querySelector('.big-picture__cancel');
    closeBigPictureElement.addEventListener('click', closeBigPictureClickHandler);
    document.addEventListener('keydown', bigPictureEscHandler);
  };

  var loadOtherComments = function (allComments, container, button) {
    container.innerHTML = '';
    var fragment = document.createDocumentFragment();
    if ((allComments.length - showedComments) > START_COMMENTS_NUMBER) {
      showedComments += START_COMMENTS_NUMBER;
      for (var i = 0; i < showedComments; i++) {
        fragment.appendChild(window.gallery.createNewCommentElement(allComments[i]));
      }
    } else if ((allComments.length - showedComments) <= START_COMMENTS_NUMBER) {
      showedComments = allComments.length;
      button.classList.add('hidden');

      for (var j = 0; j < showedComments; j++) {
        fragment.appendChild(window.gallery.createNewCommentElement(allComments[j]));
      }
    }
    container.appendChild(fragment);
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

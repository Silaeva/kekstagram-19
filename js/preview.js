'use strict';

(function () {
  var COMMENTS_NUMBER = 5;
  var usersPictures = document.querySelectorAll('.picture');
  var bigPictureElement = document.querySelector('.big-picture');


  var addCommentElements = function (commentData, element) { // создание комментов
    element.innerHTML = '';
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < COMMENTS_NUMBER; i++) {
      fragment.appendChild(window.gallery.createNewCommentElement(commentData[i]));
    }
    element.appendChild(fragment);
  };

  var fillBigPictureWithData = function (pictureData) { // заполнение данными
    var newBigPictureElement = bigPictureElement.cloneNode(true);

    newBigPictureElement.querySelector('.big-picture__img img').src = pictureData.url;
    newBigPictureElement.querySelector('.likes-count').textContent = pictureData.likes;
    newBigPictureElement.querySelector('.comments-count').textContent = pictureData.comments.length;
    newBigPictureElement.querySelector('.social__caption').textContent = pictureData.description;

    var commentsListElement = newBigPictureElement.querySelector('.social__comments');
    addCommentElements(pictureData.comments, commentsListElement); // добавляются комменты

    bigPictureElement.replaceWith(newBigPictureElement);
    newBigPictureElement.classList.remove('hidden');
    bigPictureElement = newBigPictureElement;

    document.querySelector('body').classList.add('modal-open');
    newBigPictureElement.querySelector('.social__comment-count').classList.add('hidden'); // количество комментов
    newBigPictureElement.querySelector('.comments-loader').classList.add('hidden'); // кнопка загрузки комментариев

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

  var addPictureClickHandler = function (userPic, photo) { // заполнение информацией по клику
    userPic.addEventListener('click', function () {
      fillBigPictureWithData(photo);
    });
  };

  var addClickHandlers = function (pictures, data) {
    for (var j = 0; j < pictures.length; j++) {
      addPictureClickHandler(pictures[j], data[j]);
    }
  };

  var successHandler = function (photos) {
    addClickHandlers(usersPictures, photos);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: rgb(82%, 20%, 20%, 0.9); background-color: rgba(0, 0, 0, 0.9);';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = 0;
    node.style.bottom = 0;

    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

})();

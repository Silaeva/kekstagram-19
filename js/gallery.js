'use strict';

(function () {
  var picturesListElement = document.querySelector('.pictures');
  var pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

  var fillPhotoTemplateWithData = function (data) {
    var descriptionElement = pictureTemplateElement.cloneNode(true);

    descriptionElement.querySelector('.picture__img').src = data.url;
    descriptionElement.querySelector('.picture__img').alt = data.description;
    descriptionElement.querySelector('.picture__comments').textContent = data.comments.length;
    descriptionElement.querySelector('.picture__likes').textContent = data.likes;

    return descriptionElement;
  };

  var addElements = function (picturesData) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < picturesData.length; i++) {
      fragment.appendChild(fillPhotoTemplateWithData(picturesData[i]));
    }
    picturesListElement.appendChild(fragment);
  };

  addElements(window.data.photos);

  var commentTemplateElement = document.querySelector('.social__comment');

  var createNewCommentElement = function (commentData) {
    var commentElement = commentTemplateElement.cloneNode(true);

    commentElement.querySelector('.social__picture').src = commentData.avatar;
    commentElement.querySelector('.social__picture').alt = commentData.name;
    commentElement.querySelector('.social__text').textContent = commentData.message;

    return commentElement;
  };

  var addCommentElements = function (commentData, element) {
    element.innerHTML = '';
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < commentData.length; i++) {
      fragment.appendChild(createNewCommentElement(commentData[i]));
    }
    element.appendChild(fragment);
  };

  window.gallery = {
    addCommentElements: addCommentElements
  };
})();

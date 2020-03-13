'use strict';

(function () {
  var RANDOM_PHOTOS_NUMBER = 10;
  var picturesContainerElement = document.querySelector('.pictures');
  var pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
  var filtersElement = document.querySelector('.img-filters');
  var filterDefaultElement = filtersElement.querySelector('#filter-default');
  var filterRandomElement = filtersElement.querySelector('#filter-random');
  var filterDiscussedElement = filtersElement.querySelector('#filter-discussed');
  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

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
    picturesContainerElement.appendChild(fragment);
  };

  var commentTemplateElement = document.querySelector('.social__comment');

  var createNewCommentElement = function (commentData) {
    var commentElement = commentTemplateElement.cloneNode(true);

    commentElement.querySelector('.social__picture').src = commentData.avatar;
    commentElement.querySelector('.social__picture').alt = commentData.name;
    commentElement.querySelector('.social__text').textContent = commentData.message;

    return commentElement;
  };

  var photos = [];
  var randomPhotos = [];
  var discussedPhotos = [];

  var clearPhotosList = function () {
    picturesContainerElement.querySelectorAll('.picture').forEach(function (item) {
      picturesContainerElement.removeChild(item);
    });
    filterDefaultElement.classList.remove('img-filters__button--active');
    filterRandomElement.classList.remove('img-filters__button--active');
    filterDiscussedElement.classList.remove('img-filters__button--active');
  };


  var filterPhotos = function () {
    addElements(photos);
    var usersPictures = document.querySelectorAll('.picture');
    window.preview.addClickHandlers(usersPictures, photos);

    filterDefaultElement.addEventListener('click', function () {
      window.debounce.set(function () {
        clearPhotosList();
        filterDefaultElement.classList.add('img-filters__button--active');
        addElements(photos);
        usersPictures = document.querySelectorAll('.picture');
        window.preview.addClickHandlers(usersPictures, photos);
      });
    });

    filterRandomElement.addEventListener('click', function () {
      window.debounce.set(function () {
        clearPhotosList();
        filterRandomElement.classList.add('img-filters__button--active');
        while (randomPhotos.length < RANDOM_PHOTOS_NUMBER) {
          var randomPhoto = window.utils.getRandomElement(photos);
          if (randomPhotos.indexOf(randomPhoto) === -1) {
            randomPhotos.push(randomPhoto);
          }
        }
        addElements(randomPhotos);
        usersPictures = document.querySelectorAll('.picture');
        window.preview.addClickHandlers(usersPictures, randomPhotos);
      });
    });

    filterDiscussedElement.addEventListener('click', function () {
      window.debounce.set(function () {
        clearPhotosList();
        filterDiscussedElement.classList.add('img-filters__button--active');
        discussedPhotos = photos.slice().sort(function (left, right) {
          var rankDiff = right.comments.length - left.comments.length;
          if (rankDiff === 0) {
            rankDiff = photos.indexOf(left) - photos.indexOf(right);
          }
          return rankDiff;
        });
        addElements(discussedPhotos);
        usersPictures = document.querySelectorAll('.picture');
        window.preview.addClickHandlers(usersPictures, discussedPhotos);
      });
    });
  };


  var successHandler = function (data) {
    photos = data;
    filterPhotos();
    filtersElement.classList.remove('img-filters--inactive');
  };

  var errorHandler = function (errorMessage) {
    window.form.createResultMessage(errorTemplateElement, errorMessage);

    var errorLayerElement = document.querySelector('.error');
    var messageButtonElement = errorLayerElement.querySelector('.error__button');
    messageButtonElement.textContent = 'Попробовать еще раз';

    messageButtonElement.addEventListener('click', function () {
      main.removeChild(errorLayerElement);
    });
  };

  window.backend.load(successHandler, errorHandler);


  window.gallery = {
    createNewCommentElement: createNewCommentElement,
  };
})();

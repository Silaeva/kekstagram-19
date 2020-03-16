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
    picturesData.forEach(function (picture) {
      fragment.appendChild(fillPhotoTemplateWithData(picture));
    });
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
  var activeFilterButton = filterDefaultElement;

  var clearPhotosList = function (button) {
    picturesContainerElement.querySelectorAll('.picture').forEach(function (item) {
      picturesContainerElement.removeChild(item);
    });
    button.classList.remove('img-filters__button--active');
  };

  var renderPictures = function (filterButton, pictures) {
    clearPhotosList(activeFilterButton);
    filterButton.classList.add('img-filters__button--active');
    addElements(pictures);
    var usersPictures = document.querySelectorAll('.picture');
    window.preview.addClickHandlers(usersPictures, pictures);
    activeFilterButton = filterButton;
  };

  var addFilterClickHandlers = function () {
    addElements(photos);
    var usersPictures = document.querySelectorAll('.picture');
    window.preview.addClickHandlers(usersPictures, photos);

    filterDefaultElement.addEventListener('click', function () {
      window.debounce.set(function () {
        renderPictures(filterDefaultElement, photos);
      });
    });

    filterRandomElement.addEventListener('click', function () {
      window.debounce.set(function () {
        randomPhotos = [];
        var arrayCopy = photos.slice();

        for (var i = 0; i < RANDOM_PHOTOS_NUMBER; i++) {
          var randomIndex = Math.floor(Math.random() * arrayCopy.length);
          var currentElement = arrayCopy.splice(randomIndex, 1);
          randomPhotos.push(currentElement[0]);
        }
        renderPictures(filterRandomElement, randomPhotos);
      });
    });

    filterDiscussedElement.addEventListener('click', function () {
      window.debounce.set(function () {
        discussedPhotos = photos.slice().sort(function (left, right) {
          var rankDiff = right.comments.length - left.comments.length;
          if (rankDiff === 0) {
            rankDiff = photos.indexOf(left) - photos.indexOf(right);
          }
          return rankDiff;
        });
        renderPictures(filterDiscussedElement, discussedPhotos);
      });
    });
  };


  var successHandler = function (data) {
    photos = data;
    addFilterClickHandlers();
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

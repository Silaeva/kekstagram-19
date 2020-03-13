'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var addXhrEventHandlers = function (request, successFunction, errorFunction) {
    request.addEventListener('load', function () {
      if (request.status === StatusCode.OK) {
        successFunction(request.response);
      } else {
        errorFunction('Статус ответа: ' + request.status + ' ' + request.statusText);
      }
    });
    request.addEventListener('error', function () {
      errorFunction('Произошла ошибка соединения');
    });
    request.addEventListener('timeout', function () {
      errorFunction('Запрос не успел выполниться за ' + request.timeout + 'мс');
    });
    request.timeout = TIMEOUT_IN_MS;
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    addXhrEventHandlers(xhr, onLoad, onError);

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    addXhrEventHandlers(xhr, onLoad, onError);

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();

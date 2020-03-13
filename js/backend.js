'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var METHOD_GET = 'GET';
  var METHOD_POST = 'POST';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  var xhr;

  var addXhrEventHandlers = function (onSuccess, onError) {
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;
  };

  var load = function (onLoad, onError) {
    addXhrEventHandlers(onLoad, onError);

    xhr.open(METHOD_GET, URL_GET);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    addXhrEventHandlers(onLoad, onError);

    xhr.open(METHOD_POST, URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();

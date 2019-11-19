'use strict';

(function () {
  var SERVER_OK = 200;

  window.dataLoad = function (onload, onerror) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_OK) {
        onload(xhr.response);
      } else {
        onerror();
      }
    });

    xhr.send();
  };

  window.dataSend = function (data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_OK) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();

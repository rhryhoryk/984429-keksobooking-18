'use strict';

(function () {
  window.dataLoad = function (onload, onerror) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onload(xhr.response);
      } else {
        onerror();
      }
    });

    xhr.send();

  };
})();

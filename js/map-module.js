'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFormFilters = document.querySelector('.map__filters');

  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var NUMBER_OF_ADS_NEAR_BY = 5;
  var MAIN_PIN_SIZE = 65;
  var TAIL_PIN_SIZE = 22;

  var renderAds = function (newAds) {
    var adsElement = pinTemplate.cloneNode(true);
    adsElement.style.left = newAds.location.x + 'px';
    adsElement.style.top = newAds.location.y + 'px';
    adsElement.querySelector('img').src = newAds.author.avatar;
    adsElement.querySelector('img').alt = newAds.offer.title;
    return adsElement;
  };

  var onload = function (ads) {
    var fragment = document.createDocumentFragment();
    var currentArr = window.filter.filterType(ads);
    var oldPins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < NUMBER_OF_ADS_NEAR_BY; i++) {
      if (currentArr[i] === undefined) {
        continue;
      } else {
        for (var k = 1; k < oldPins.length; k++) {
          oldPins[k].remove();
        }
        fragment.appendChild(renderAds(currentArr[i]));
      }
    }
    mapPins.appendChild(fragment);
  };

  var onerror = function () {
    var errorMsg = errorTemplate.cloneNode(true);
    mapPins.appendChild(errorMsg);
  };

  window.mapModule = {
    map: map,
    mapFormFilters: mapFormFilters,
    mapPinMain: mapPinMain,
    MAIN_PIN_SIZE: MAIN_PIN_SIZE,
    TAIL_PIN_SIZE: TAIL_PIN_SIZE,
    onload: onload,
    onerror: onerror
  };
})();

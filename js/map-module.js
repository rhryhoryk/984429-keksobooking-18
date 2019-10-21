'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFormFilters = document.querySelector('.map__filters');

  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

  var renderCard = function (data) {
    var infoCard = cardTemplate.cloneNode(true);
    infoCard.querySelector('.popup__title').innerHTML = data.offer.title;
    infoCard.querySelector('.popup__text--address').innerHTML = data.offer.address;
    infoCard.querySelector('.popup__text--price').innerHTML = data.offer.price + '&#x20bd;<span>/ночь</span>';
    infoCard.querySelector('.popup__type').innerHTML = data.offer.type;
    infoCard.querySelector('.popup__text--capacity').innerHTML = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    infoCard.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    infoCard.querySelector('.popup__description').innerHTML = data.offer.description;

    var featureList = infoCard.querySelector('.popup__features');
    while (featureList.firstChild) {
      featureList.removeChild(featureList.firstChild);
    }
    var featureArr = [];
    for (var i = 0; i < data.offer.features.length; i++) {
      switch (data.offer.features[i]) {
        case 'wifi':
          featureArr += '<li class="popup__feature popup__feature--wifi"></li>';
          break;
        case 'dishwasher':
          featureArr += '<li class="popup__feature popup__feature--dishwasher"></li>';
          break;
        case 'parking':
          featureArr += '<li class="popup__feature popup__feature--parking"></li>';
          break;
        case 'washer':
          featureArr += '<li class="popup__feature popup__feature--washer"></li>';
          break;
        case 'elevator':
          featureArr += '<li class="popup__feature popup__feature--elevator"></li>';
          break;
        case 'conditioner':
          featureArr += '<li class="popup__feature popup__feature--conditioner"></li>';
          break;
        default:
          break;
      }
    }
    featureList.innerHTML = featureArr;

    var photoArr = data.offer.photos;
    for (var j = 0; j < photoArr.length; j++) {
      infoCard.querySelector('.popup__photo').src = photoArr[j];
    }

    return infoCard;
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
        fragment.appendChild(renderCard(currentArr[i]));
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

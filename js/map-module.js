'use strict';
(function () {
  var NUMBER_OF_ADS_NEAR_BY = 5;
  var MAIN_PIN_SIZE = 65;
  var TAIL_PIN_SIZE = 22;
  var MAP_START_X_COORDINATE = 570;
  var MAP_START_Y_COORDINATE = 375;
  var MIN_HORIZONTAL_MAP_COORDINATE = 0;
  var MAX_HORIZONTAL_MAP_COORDINATE = 1135;
  var MIN_VERTICAL_MAP_COORDINATE = 130;
  var MAX_VERTICAL_MAP_COORDINATE = 630;

  var map = document.querySelector('.map');
  var mapFormFilters = document.querySelector('.map__filters');

  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoord = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();
      var shift = {
        x: startCoord.x - evtMove.clientX,
        y: startCoord.y - evtMove.clientY
      };
      startCoord = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      if (mapPinMain.style.top.slice(0, -2) < MIN_VERTICAL_MAP_COORDINATE - MAIN_PIN_SIZE - TAIL_PIN_SIZE) {
        mapPinMain.style.top = MIN_VERTICAL_MAP_COORDINATE - MAIN_PIN_SIZE - TAIL_PIN_SIZE + 'px';
      }
      if (mapPinMain.style.top.slice(0, -2) > MAX_VERTICAL_MAP_COORDINATE - MAIN_PIN_SIZE - TAIL_PIN_SIZE) {
        mapPinMain.style.top = MAX_VERTICAL_MAP_COORDINATE - MAIN_PIN_SIZE - TAIL_PIN_SIZE + 'px';
      }

      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      if (mapPinMain.style.left.slice(0, -2) < MIN_HORIZONTAL_MAP_COORDINATE) {
        mapPinMain.style.left = MIN_HORIZONTAL_MAP_COORDINATE + 'px';
      }
      if (mapPinMain.style.left.slice(0, -2) > MAX_HORIZONTAL_MAP_COORDINATE) {
        mapPinMain.style.left = MAX_HORIZONTAL_MAP_COORDINATE + 'px';
      }
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.util.setPinCoordinates();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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
    infoCard.querySelector('img').src = data.author.avatar;

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
    var currentArr = window.filter.filterAll(ads);

    var oldPins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < NUMBER_OF_ADS_NEAR_BY; i++) {
      if (currentArr[i] === undefined) {
        continue;
      } else {
        for (var j = 1; j < oldPins.length; j++) {
          oldPins[j].remove();
        }
        fragment.appendChild(renderAds(currentArr[i]));
      }
    }
    for (var iPin = window.mapModule.mapPins.children.length - 1; iPin >= 2; iPin--) {
      window.mapModule.mapPins.removeChild(window.mapModule.mapPins.children[iPin]);
    }
    mapPins.appendChild(fragment);

    var pins = document.querySelectorAll('.map__pin');

    var onpinClick = function (pin, card) {
      pin.addEventListener('click', function () {

        var oldCard = document.querySelector('.map__card');
        if (oldCard !== null) {
          oldCard.remove();
        }
        fragment.appendChild(renderCard(card));
        mapPins.appendChild(fragment);

        var closePopupButton = document.querySelector('.popup__close');
        var pinCard = document.querySelector('.map__card');

        var onClosePopupButtonClick = function () {
          pinCard.remove();
        };

        closePopupButton.addEventListener('click', onClosePopupButtonClick);
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.util.ESC_BUTTON) {
            pinCard.remove();
          }
        });
      });
    };

    for (var k = 1; k < pins.length; k++) {
      var pin = pins[k];
      var currentCard = currentArr[k - 1];
      onpinClick(pin, currentCard);
    }
  };

  var onerror = function () {
    var errorMsg = errorTemplate.cloneNode(true);
    mapPins.appendChild(errorMsg);
  };

  window.mapModule = {
    map: map,
    mapPins: mapPins,
    mapFormFilters: mapFormFilters,
    mapPinMain: mapPinMain,
    MAP_START_X_COORDINATE: MAP_START_X_COORDINATE,
    MAP_START_Y_COORDINATE: MAP_START_Y_COORDINATE,
    MAIN_PIN_SIZE: MAIN_PIN_SIZE,
    TAIL_PIN_SIZE: TAIL_PIN_SIZE,
    onload: onload,
    onerror: onerror
  };
})();

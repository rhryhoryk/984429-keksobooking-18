'use strict';

// ---------------------------------------------------неактивный режим----------------------------------------------------

var formFieldsets = document.querySelectorAll('.ad-form fieldset');
var mapFiltersForm = document.querySelector('.map__filters');
var addressInput = document.querySelector('.ad-form input[name=address]');

var setTagDesabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = true;
  }
};

var setInactiveMode = function () {
  setTagDesabled(formFieldsets);
  setTagDesabled(mapFiltersForm);
  addressInput.placeholder = 'x: 603 y: 407';
  addressInput.readOnly = true;
};

setInactiveMode();

// ---------------------------------------------------активный режим------------------------------------------------------

var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');

var setTagAvailable = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = false;
  }
};

var setActiveMode = function () {
  setTagAvailable(formFieldsets);
  setTagAvailable(mapFiltersForm);
  map.classList.remove('map--faded');
};


// -----------------------------------------------------рассчитываем кординату-------------------------------------------

var MAIN_PIN_SIZE = 65;
var TAIL_PIN_SIZE = 22;


var getPinCoordinates = function (pin) {
  var positionX = '';
  var leftPX = pin.style.left;
  var positionY = '';
  var topPX = pin.style.top;
  for (var i = 0; i < leftPX.length; i++) {
    if (isNaN(Number(leftPX[i])) === false) {
      positionX += leftPX[i];
    }
  }
  for (var j = 0; j < topPX.length; j++) {
    if (isNaN(Number(topPX[j])) === false) {
      positionY += topPX[j];
    }
  }
  var realX = Math.round(Number(positionX) + (MAIN_PIN_SIZE / 2));
  var realY = Math.round(Number(positionY) + MAIN_PIN_SIZE + TAIL_PIN_SIZE);

  var position = 'x: ' + realX + ' y: ' + realY;
  return position;
};

var setPinCoordinates = function () {
  addressInput.placeholder = getPinCoordinates(mapPinMain);
  addressInput.readOnly = true;
};


// ---------------------------------------------------вешаем слушатель-------------------------------------
mapPinMain.addEventListener('click', function () {
  setActiveMode();
  setPinCoordinates();
});


// ---------------------------------------------------------валидация-------------------------------------------

var adForm = document.querySelector('.ad-form');
var selectRoom = adForm.querySelector('.ad-form select[name=rooms]');
var selectCapacity = adForm.querySelector('.ad-form select[name=capacity]');

var validationRoomCapacity = function () {
  if (selectRoom.value === '1') {
    if (selectCapacity.value === '1') {
      selectCapacity.setCustomValidity('');
    } else {
      selectCapacity.setCustomValidity('Увы, в таких апатраментах может жить только один гость');
    }
  }
  if (selectRoom.value === '2') {
    if (selectCapacity.value === '1' || selectCapacity.value === '2') {
      selectCapacity.setCustomValidity('');
    } else {
      selectCapacity.setCustomValidity('Увы, в таких апатраментах может жить только один или два гостя');
    }
  }
  if (selectRoom.value === '3') {
    if (selectCapacity.value === '1' || selectCapacity.value === '2' || selectCapacity.value === '3') {
      selectCapacity.setCustomValidity('');
    } else {
      selectCapacity.setCustomValidity('Увы, это апатраменты для гостей');
    }
  }
  if (selectRoom.value === '100') {
    if (selectCapacity.value === '0') {
      selectCapacity.setCustomValidity('');
    } else {
      selectCapacity.setCustomValidity('Увы, это апатраменты не для гостей');
    }
  }
};

adForm.addEventListener('change', validationRoomCapacity);

// ------------------------------------------------------------------------------------------------------------
// var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// var mapPins = document.querySelector('.map__pins');

// var NUMBER_OF_ADS_NEAR_BY = 8;
// var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
// var CHECKINS_CHECKOUTS = ['12:00', '13:00', '14:00'];
// var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var ACCOMMODATION_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// var MAP_PIN_SIZE = 40;

// var getRandomNumber = function (minnum, maxnum) {
//   return Math.floor(Math.random() * (maxnum - minnum)) + minnum;
// };

// var createRandomArr = function (arr) {
//   var newArr = [];
//   var newArrLength = getRandomNumber(1, arr.length);
//   for (var i = 0; i < newArrLength; i++) {
//     newArr.push(arr[i]);
//   }
//   return newArr;
// };

// var createAds = function (index) {
//   var ads = {};

//   ads.author = {};
//   ads.author.avatar = 'img/avatars/user' + '0' + (index + 1) + '.png';

//   ads.offer = {};
//   ads.offer.title = 'ads №' + (index + 1);
//   ads.offer.address = '' + location.x + ',' + location.y;
//   ads.offer.price = getRandomNumber(10000, 50000);
//   ads.offer.type = OFFER_TYPES[getRandomNumber(0, OFFER_TYPES.length)];
//   ads.offer.rooms = getRandomNumber(1, 3);
//   ads.offer.guests = getRandomNumber(0, 2);
//   ads.offer.checkin = CHECKINS_CHECKOUTS[getRandomNumber(0, CHECKINS_CHECKOUTS.length)];
//   ads.offer.checkout = CHECKINS_CHECKOUTS[getRandomNumber(0, CHECKINS_CHECKOUTS.length)];
//   ads.offer.features = createRandomArr(FEATURES);
//   ads.offer.description = 'some kinda description';
//   ads.offer.photos = createRandomArr(ACCOMMODATION_PHOTOS);

//   ads.location = {};
//   ads.location.x = getRandomNumber(0 + MAP_PIN_SIZE, 1200 - MAP_PIN_SIZE);
//   ads.location.y = getRandomNumber(130, 630);
//   return ads;
// };

// var createAdsNearBy = function (numberOfAds) {
//   var adsArr = [];
//   for (var i = 0; i < numberOfAds; i++) {
//     adsArr.push(createAds(i));
//   }
//   return adsArr;
// };

// var renderAds = function (newAds) {
//   var adsElement = pinTemplate.cloneNode(true);
//   adsElement.style.left = newAds.location.x + 'px';
//   adsElement.style.top = newAds.location.y + 'px';
//   adsElement.querySelector('img').src = newAds.author.avatar;
//   adsElement.querySelector('img').alt = newAds.offer.title;
//   mapPins.appendChild(adsElement);
// };

// for (var i = 0; i < NUMBER_OF_ADS_NEAR_BY; i++) {
//   renderAds(createAdsNearBy(NUMBER_OF_ADS_NEAR_BY)[i]);
// }

'use strict';

document.querySelector('.map').classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var NUMBER_OF_ADS_NEAR_BY = 8;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS_CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ACCOMMODATION_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var MAP_PIN_SIZE = 40;

var getRandomNumber = function (minnum, maxnum) {
  return Math.floor(Math.random() * (maxnum - minnum)) + minnum;
};

var createRandomArr = function (arr) {
  var newArr = [];
  var newArrLength = getRandomNumber(1, arr.length);
  for (var i = 0; i < newArrLength; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
};

var createAds = function (index) {
  var ads = {};

  ads.author = {};
  ads.author.avatar = 'img/avatars/user' + '0' + (index + 1) + '.png';

  ads.offer = {};
  ads.offer.title = 'ads №' + (index + 1);
  ads.offer.address = '' + location.x + ',' + location.y;
  ads.offer.price = getRandomNumber(10000, 50000);
  ads.offer.type = OFFER_TYPES[getRandomNumber(0, OFFER_TYPES.length)];
  ads.offer.rooms = getRandomNumber(1, 3);
  ads.offer.guests = getRandomNumber(0, 2);
  ads.offer.checkin = CHECKINS_CHECKOUTS[getRandomNumber(0, CHECKINS_CHECKOUTS.length)];
  ads.offer.checkout = CHECKINS_CHECKOUTS[getRandomNumber(0, CHECKINS_CHECKOUTS.length)];
  ads.offer.features = createRandomArr(FEATURES);
  ads.offer.description = 'some kinda description';
  ads.offer.photos = createRandomArr(ACCOMMODATION_PHOTOS);

  ads.location = {};
  ads.location.x = getRandomNumber(0 + MAP_PIN_SIZE, 1200 - MAP_PIN_SIZE);
  ads.location.y = getRandomNumber(130, 630);
  return ads;
};

var createAdsNearBy = function (numberOfAds) {
  var adsArr = [];
  for (var i = 0; i < numberOfAds; i++) {
    adsArr.push(createAds(i));
  }
  return adsArr;
};

var renderAds = function (newAds) {
  var adsElement = pinTemplate.cloneNode(true);
  adsElement.style.left = newAds.location.x + 'px';
  adsElement.style.top = newAds.location.y + 'px';
  adsElement.querySelector('img').src = newAds.author.avatar;
  adsElement.querySelector('img').alt = newAds.offer.title;
  mapPins.appendChild(adsElement);
};

for (var i = 0; i < NUMBER_OF_ADS_NEAR_BY; i++) {
  renderAds(createAdsNearBy(NUMBER_OF_ADS_NEAR_BY)[i]);
}

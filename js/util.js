'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;


  var addressInput = document.querySelector('.ad-form input[name=address]');

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
    var realX = Math.round(Number(positionX) + (window.mapModule.MAIN_PIN_SIZE / 2));
    var realY = Math.round(Number(positionY) + window.mapModule.MAIN_PIN_SIZE + window.mapModule.TAIL_PIN_SIZE);

    var position = 'x: ' + realX + ' y: ' + realY;
    return position;
  };

  var setPinCoordinates = function () {
    addressInput.placeholder = window.util.getPinCoordinates(window.mapModule.mapPinMain);
    addressInput.value = window.util.getPinCoordinates(window.mapModule.mapPinMain);

    addressInput.readOnly = true;
  };

  var setTagDesabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  };

  var setTagAvailable = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = false;
    }
  };

  var setActiveMode = function () {
    setTagAvailable(window.formModule.formFieldsets);
    setTagAvailable(window.mapModule.mapFormFilters);
    window.mapModule.map.classList.remove('map--faded');
    window.formModule.adForm.classList.remove('ad-form--disabled');
  };

  var onMainPinClick = function () {
    setActiveMode();
    setPinCoordinates();
    window.dataLoad(window.mapModule.onload, window.mapModule.onerror);
    window.mapModule.mapPinMain.removeEventListener('click', onMainPinClick);
  };


  var debounce = function (cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    // getRandomNumber: getRandomNumber,
    // createRandomArr: createRandomArr,
    getPinCoordinates: getPinCoordinates,
    setPinCoordinates: setPinCoordinates,
    setTagDesabled: setTagDesabled,
    setActiveMode: setActiveMode,
    onMainPinClick: onMainPinClick,
    debounce: debounce
  };

})();

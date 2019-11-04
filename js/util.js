'use strict';
(function () {

  var addressInput = document.querySelector('.ad-form input[name=address]');

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


  window.util = {
    getRandomNumber: getRandomNumber,
    createRandomArr: createRandomArr,
    getPinCoordinates: getPinCoordinates,
    setPinCoordinates: setPinCoordinates
  };

})();

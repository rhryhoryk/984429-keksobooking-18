'use strict';
(function () {
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

  window.util = {
    getRandomNumber: getRandomNumber,
    createRandomArr: createRandomArr
  };
})();

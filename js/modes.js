'use strict';
(function () {
  // -----------------------------------------------------inactiveMODE------------------------------------------------------

  var setTagDesabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  };

  var setInactiveMode = function () {
    setTagDesabled(window.formModule.formFieldsets);
    setTagDesabled(window.mapModule.mapFormFilters);
    window.formModule.addressInput.placeholder = 'x: 603 y: 407';
    window.formModule.addressInput.readOnly = true;
  };

  setInactiveMode();

  // -----------------------------------------------------activeMODE------------------------------------------------------


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


  window.mapModule.mapPinMain.addEventListener('click', function () {
    setActiveMode();
    window.formModule.setPinCoordinates();
    window.mapModule.setAdsNearBy();
  });
})();

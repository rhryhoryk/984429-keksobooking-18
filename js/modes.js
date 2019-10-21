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

  var onMainPinClick = function () {
    setActiveMode();
    window.formModule.setPinCoordinates();
    window.dataLoad(window.mapModule.onload, window.mapModule.onerror);
    window.mapModule.mapPinMain.removeEventListener('click', onMainPinClick);
  };

  window.mapModule.mapPinMain.addEventListener('click', onMainPinClick);


  window.filter.housingTypeSelect.addEventListener('change', function () {

    window.dataLoad(window.mapModule.onload, window.mapModule.onerror);
  });
})();

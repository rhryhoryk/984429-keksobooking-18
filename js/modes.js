'use strict';
(function () {
  // -----------------------------------------------------inactiveMODE------------------------------------------------------

  var setInactiveMode = function () {
    window.util.setTagDesabled(window.formModule.formFieldsets);
    window.util.setTagDesabled(window.mapModule.mapFormFilters);
    window.formModule.addressInput.placeholder = 'x: 603 y: 407';
    window.formModule.addressInput.readOnly = true;
  };

  setInactiveMode();

  // -----------------------------------------------------activeMODE------------------------------------------------------

  window.mapModule.mapPinMain.addEventListener('click', window.util.onMainPinClick);

  window.filter.mapFiltersForm.addEventListener('change', window.util.debounce(function () {
    window.dataLoad(window.mapModule.onload, window.mapModule.onerror);
  }));
})();

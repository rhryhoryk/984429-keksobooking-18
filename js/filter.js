'use strict';

(function () {

  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeSelect = mapFiltersForm.querySelector('#housing-type');
  var houseType = mapFiltersForm.querySelector('.map__filters select[name=housing-type]');

  var filterType = function (data) {
    var houseArr = [];
    if (houseType.value === 'any') {
      houseArr = data;
    } else {
      houseArr = data.filter(function (element) {
        return element.offer.type === houseType.value;
      });
    }
    return houseArr;
  };

  window.filter = {
    housingTypeSelect: housingTypeSelect,
    filterType: filterType
  };
})();

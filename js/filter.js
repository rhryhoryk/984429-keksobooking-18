'use strict';

(function () {
  var LOW_HOUSE_PRICE = 10000;
  var HIGH_HOUSE_PRICE = 50000;


  var mapFiltersForm = document.querySelector('.map__filters');
  var houseType = mapFiltersForm.querySelector('.map__filters select[name=housing-type]');
  var housePrice = mapFiltersForm.querySelector('.map__filters select[name=housing-price]');
  var houseRooms = mapFiltersForm.querySelector('.map__filters select[name=housing-rooms]');
  var houseGuests = mapFiltersForm.querySelector('.map__filters select[name=housing-guests]');
  var houseFearures = Array.from(mapFiltersForm.querySelectorAll('.map__checkbox'));

  var filterAll = function (data) {
    var arrToRender = data.slice();

    if (houseType.value !== 'any') {
      arrToRender = arrToRender.filter(function (element) {
        return element.offer.type === houseType.value;
      });
    }

    if (housePrice.value !== 'any') {
      arrToRender = arrToRender.filter(function (element) {
        if (Number(element.offer.price) < LOW_HOUSE_PRICE) {
          element.offer.price = 'low';
        } else if (Number(element.offer.price) > HIGH_HOUSE_PRICE) {
          element.offer.price = 'high';
        } else {
          element.offer.price = 'middle';
        }
        return element.offer.price === housePrice.value;
      });
    }

    if (houseRooms.value !== 'any') {
      arrToRender = arrToRender.filter(function (element) {
        return element.offer.rooms === Number(houseRooms.value);
      });
    }

    if (houseGuests.value !== 'any') {
      arrToRender = arrToRender.filter(function (element) {
        return element.offer.guests === Number(houseGuests.value);
      });
    }

    if (houseFearures.some(function (element) {
      return element.checked;
    })) {
      arrToRender = arrToRender.filter(function (element) {

        var fearures = houseFearures.slice();
        fearures = fearures.filter(function (el) {
          return el.checked;
        });
        var feature = fearures[0].value;
        return element.offer.features.indexOf(feature) !== -1;
      });
    }
    return arrToRender;
  };

  window.filter = {
    mapFiltersForm: mapFiltersForm,
    filterAll: filterAll
  };
})();

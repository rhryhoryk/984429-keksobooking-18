'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = document.querySelectorAll('.ad-form fieldset');

  var addressInput = adForm.querySelector('.ad-form input[name=address]');


  // -------------------------------------------------расчитываем координату главного пина и добовляем в форму---------------------------
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
    addressInput.placeholder = getPinCoordinates(window.mapModule.mapPinMain);
    addressInput.value = getPinCoordinates(window.mapModule.mapPinMain);

    addressInput.readOnly = true;
  };

  // ---------------------------------------------------------валидация типжилья<->цена ------------------------------------------

  var selectType = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');

  var validationTypePrice = function () {
    if (selectType.value === 'bungalo') {
      price.attributes.placeholder.nodeValue = '0';
    }
    if (selectType.value === 'flat') {
      price.attributes.placeholder.nodeValue = '1000';
    }
    if (selectType.value === 'house') {
      price.attributes.placeholder.nodeValue = '5000';
    }
    if (selectType.value === 'palace') {
      price.attributes.placeholder.nodeValue = '10000';
    }
  };

  // ----------------------------------------------------------валидия въезд<->выезд ---------------------------------------------
  var selectCheckIN = adForm.querySelector('#timein');
  var selectCheckOUT = adForm.querySelector('#timeout');

  var validationIn = function () {
    if (selectCheckIN.value !== selectCheckOUT.value) {
      selectCheckOUT.value = selectCheckIN.value;
    }
  };

  var validationOut = function () {
    if (selectCheckOUT.value !== selectCheckIN.value) {
      selectCheckIN.value = selectCheckOUT.value;
    }
  };

  // ---------------------------------------------------------валидация комнаты<->гости ------------------------------------------

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
  adForm.addEventListener('change', validationTypePrice);
  selectCheckIN.addEventListener('change', validationIn);
  selectCheckOUT.addEventListener('change', validationOut);


  window.formModule = {
    adForm: adForm,
    formFieldsets: formFieldsets,
    addressInput: addressInput,
    setPinCoordinates: setPinCoordinates
  };
})();

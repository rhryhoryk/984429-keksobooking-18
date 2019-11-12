'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = document.querySelectorAll('.ad-form fieldset');

  var addressInput = adForm.querySelector('.ad-form input[name=address]');

  // ---------------------------------------------------------валидация типжилья<->цена ------------------------------------------

  var selectType = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');

  var validationTypePrice = function () {
    if (selectType.value === 'bungalo') {
      price.attributes.placeholder.nodeValue = '0';
      price.attributes.min.nodeValue = '0';
    }
    if (selectType.value === 'flat') {
      price.attributes.placeholder.nodeValue = '1000';
      price.attributes.min.nodeValue = '1000';
    }
    if (selectType.value === 'house') {
      price.attributes.placeholder.nodeValue = '5000';
      price.attributes.min.nodeValue = '5000';
    }
    if (selectType.value === 'palace') {
      price.attributes.placeholder.nodeValue = '10000';
      price.attributes.min.nodeValue = '10000';
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

  // ---------------------------------------------------------- отправка формы ---------------------------------------------

  var onMessageClick = function () {
    document.body.removeChild(document.body.children[0]);
    document.removeEventListener('click', onMessageClick);
    document.removeEventListener('keydown', onMessageKeydown);
  };

  var onMessageKeydown = function (evt) {
    if (evt.keyCode === 27) {
      document.body.removeChild(document.body.children[0]);
      document.removeEventListener('keydown', onMessageKeydown);
      document.removeEventListener('click', onMessageClick);
    }
  };

  var setInactiveMode = function () {
    window.mapModule.map.classList.add('map--faded');
    window.mapModule.mapPinMain.style.left = window.mapModule.MAP_START_X_COORDINATE + 'px';
    window.mapModule.mapPinMain.style.top = window.mapModule.MAP_START_Y_COORDINATE + 'px';
    for (var i = window.mapModule.mapPins.children.length - 1; i >= 2; i--) {
      window.mapModule.mapPins.removeChild(window.mapModule.mapPins.children[i]);
    }
    window.mapModule.mapPinMain.addEventListener('click', window.util.onMainPinClick);

    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    window.util.setTagDesabled(window.formModule.formFieldsets);
    window.util.setTagDesabled(window.mapModule.mapFormFilters);
    window.formModule.addressInput.placeholder = 'x: 603 y: 407';
    window.formModule.addressInput.readOnly = true;
  };

  var onFormSuccess = function () {
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    (function () {
      var successMessage = successMessageTemplate.cloneNode(true);
      document.body.insertAdjacentElement('afterbegin', successMessage);
      document.addEventListener('click', onMessageClick);
      document.addEventListener('keydown', onMessageKeydown);
      setInactiveMode();
    })();
  };

  var onFormError = function () {
    var errrorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    (function () {
      var errorMessage = errrorMessageTemplate.cloneNode(true);
      document.body.insertAdjacentElement('afterbegin', errorMessage);
      document.addEventListener('click', onMessageClick);
      document.addEventListener('keydown', onMessageKeydown);
    })();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.dataSend(new FormData(adForm), onFormSuccess, onFormError);
  });

  adForm.addEventListener('reset', setInactiveMode);

  window.formModule = {
    adForm: adForm,
    formFieldsets: formFieldsets,
    addressInput: addressInput,
  };
})();

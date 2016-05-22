'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function AddressService($http) {
  this.findAddressByZipCode = function (cb, zipCode) {
    var promise = $http.get("/api/address/"+ zipCode);

    promise.success(function (address) {
      cb(address);
    });

    promise.error(function (err) {
      console.log(err);
    });
  };
}

servicesModule.service('AddressService', AddressService);
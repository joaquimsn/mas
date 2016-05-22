'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function HomeService(requestApiService) {
  this.findHome = function (cb) {
    requestApiService.get(cb, '/home');
  };
}

servicesModule.service('HomeService', HomeService);
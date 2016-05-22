'use strict';

var servicesModule      = require('./_index');

/**
 * @ngInject
 */
function ModuloService($http, requestApiService) {
  this.findModulo = function (cb) {
    requestApiService.get(cb, '/modulo');
  };
}

servicesModule.service('ModuloService', ModuloService);
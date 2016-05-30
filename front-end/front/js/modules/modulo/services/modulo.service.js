'use strict';

var servicesModule      = require('./_index');

/**
 * @ngInject
 */
function ModuloService($http, requestApiService) {
  this.findModulo = function(cb) {
    requestApiService.get(cb, '/modulos');
  };

  this.cadastrar = function(callback, data) {
    requestApiService.post(callback, data, '/modulos')
  }
}

servicesModule.service('ModuloService', ModuloService);
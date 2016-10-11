'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function TagService(requestApiService) {
  this.buscarTodas = function (callback) {
    requestApiService.get(callback, '/tags');
  };

  this.cadastrar = function(callback, tag) {
    requestApiService.postNo(callback, tag, '/tags');
  };
}

servicesModule.service('TagService', TagService);
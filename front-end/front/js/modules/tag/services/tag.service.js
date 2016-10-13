'use strict';

var servicesModule      = require('./_index');

/**
 * @ngInject
 */
function TagService(requestApiService) {
  this.buscarTodas = function(callback) {
    requestApiService.getNo(callback, '/tags');
  };

  function init() {
    
  }

  init();
}

servicesModule.service('TagService', TagService);
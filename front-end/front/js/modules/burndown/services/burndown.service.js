'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function BurndownService(requestApiService) {
  this.buscarUsuarioDisponivelParaProjeto = function(cb) {
    
    cb({});
  };
}

servicesModule.service('BurndownService', BurndownService);
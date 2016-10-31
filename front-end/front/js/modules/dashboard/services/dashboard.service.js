'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function DashboardService(requestApiService) {
  this.buscarUsuarioDisponivelParaProjeto = function(cb) {
    
    cb({});
  };
}

servicesModule.service('DashboardService', DashboardService);
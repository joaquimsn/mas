'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function FuncionalidadeService(requestApiService) {
  this.findFuncionalidade = function (cb) {
    requestApiService.get(cb, '/funcionalidade');
  };
}

servicesModule.service('FuncionalidadeService', FuncionalidadeService);
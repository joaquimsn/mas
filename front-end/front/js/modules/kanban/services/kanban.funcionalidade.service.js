'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function FuncionalidadeService(requestApiService) {
  this.cadastrar = function (cb) {
    requestApiService.post(cb, '/funcionalidades');
  };
}

servicesModule.service('FuncionalidadeService', FuncionalidadeService);
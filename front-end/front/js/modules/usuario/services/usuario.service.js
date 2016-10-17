'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function UsuarioService(requestApiService) {
  this.buscarUsuarioDisponivelParaProjeto = function(callback) {
    requestApiService.getNo(callback, '/contas');
  };
}

servicesModule.service('UsuarioService', UsuarioService);
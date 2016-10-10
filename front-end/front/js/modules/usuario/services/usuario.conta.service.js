'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function ContaService(requestApiService) {
  this.cadastrar = function(callback, conta) {
    requestApiService.postNo(callback, conta, '/contas');
  };

  this.alterar = function(callback, conta) {
    requestApiService.putNo(callback, conta, '/contas/' + conta._id);
  };

  this.buscarPorId = function(callback, id) {
    requestApiService.getNo(callback, '/contas/' + id);
  };
}

servicesModule.service('ContaService', ContaService);
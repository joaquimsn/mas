'use strict';

var servicesModule      = require('./_index');

/**
 * @ngInject
 */
function ProjetoService($http, requestApiService, SessaoService) {
  this.buscarTodosPorUsuario = function(cb) {
    requestApiService.get(cb, '/contas/' + SessaoService.getUsuario._id + '/projetos');
  };

  this.cadastrar = function(callback, data) {
    requestApiService.post(callback, data, '/contas/' + SessaoService.getUsuario._id + '/projetos');
  };
}

servicesModule.service('ProjetoService', ProjetoService);
'use strict';

var servicesModule      = require('./_index');

/**
 * @ngInject
 */
function ProjetoService($http, requestApiService, SessaoService, ContaService) {
  this.buscarTodosPorUsuario = function(cb) {
    requestApiService.get(cb, '/contas/' + SessaoService.getUsuario._id + '/projetos');
  };

  this.cadastrar = function(callback, data) {
    function cb(projeto) {
      ContaService.adicionarProjeto(projeto, SessaoService.getUsuario._id);
      callback(projeto);
    }

    requestApiService.post(cb, data, '/projetos');
  };
}

servicesModule.service('ProjetoService', ProjetoService);
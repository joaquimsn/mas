'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function UsuarioService(requestApiService, SessaoService) {
  this.buscarUsuarioDisponivelParaProjeto = function(callback) {
    function retornoCb(projeto) {
      callback(projeto.usuarios);
    }

    requestApiService.getNo(retornoCb, '/projetos/' + SessaoService.getProjeto()._id);
  };
}

servicesModule.service('UsuarioService', UsuarioService);
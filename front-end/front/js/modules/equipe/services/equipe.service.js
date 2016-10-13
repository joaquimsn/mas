'use strict';

var servicesModule      = require('./_index');

/**
 * @ngInject
 */
function EquipeService($http, requestApiService, SessaoService, ContaService) {
  this.buscarTodosPorUsuario = function(cb) {
    requestApiService.get(cb, '/contas/' + SessaoService.getUsuario()._id + '/projetos');
  };

  this.cadastrar = function(callback, data) {
    function cb(equipe) {
      //ContaService.adicionarProjeto(equipe, SessaoService.getUsuario()._id);
      callback(equipe);
    }

    requestApiService.post(cb, data, '/projetos');
  };

  this.adicionarUsuario = function(usuario) {
    function retornoCb(data) {
      console.log('Adicionado usuario ao equipe', data);
    }

    requestApiService.postNo(retornoCb, usuario, '/equipes/' + SessaoService.getUsuario()._id + '/usuarios');
  };
}

servicesModule.service('EquipeService', EquipeService);
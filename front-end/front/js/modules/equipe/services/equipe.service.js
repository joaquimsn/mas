'use strict';

var servicesModule      = require('./_index');

/**
 * @ngInject
 */
function EquipeService($http, requestApiService, SessaoService, ContaService) {
  this.buscarEquipes = function(cb) {
    function callback(conta) {
      cb(conta.equipes);
    }

    requestApiService.getNo(callback, '/contas/' + SessaoService.getUsuario()._id);
  };

  this.cadastrar = function(callback, data) {
    function cb(equipe) {
      callback(equipe);
    }

    requestApiService.putNo(cb, data, '/contas/' + SessaoService.getUsuario()._id + '/equipes');
  };

  this.adicionarMembro = function(callback, usuario, equipe) {
    requestApiService.putNo(callback, usuario, '/contas/' + SessaoService.getUsuario()._id + '/equipes/' + equipe._id + '/membros');
  };

  this.buscarMembros = function(callback, equipe) {
    requestApiService.getNo(callback, '/contas/' + SessaoService.getUsuario()._id + '/equipes/' + equipe._id + '/membros');
  };
}

servicesModule.service('EquipeService', EquipeService);
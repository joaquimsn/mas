'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function SessaoService($window) {
  this.storeUsuario = function(usuario) {
    $window.sessionStorage.usuario = JSON.stringify(usuario);
  };

  this.getUsuario = function() {
    var usuario = JSON.parse($window.sessionStorage.usuario || {});
    return usuario;
  };

   this.storeModoVisao = function(modo) {
    $window.sessionStorage.modoVisao = JSON.stringify(modo);
  };

  this.getModoVisao = function() {
    var modoVisao = JSON.parse($window.sessionStorage.modoVisao || {});
    return modoVisao;
  };

  this.storeProjeto = function(projeto) {
    $window.sessionStorage.projetoSelecionado = JSON.stringify(projeto);
  };

  this.getPorjeto = function() {
    var projeto = JSON.parse($window.sessionStorage.projetoSelecionado || {});
    return projeto;
  };

  this.storeFuncionalidade = function(funcionalidade) {
    $window.sessionStorage.funcionalidadeSelecionado = JSON.stringify(funcionalidade);
  };

  this.getFuncionalidade = function() {
    var funcionalidade = JSON.parse($window.sessionStorage.funcionalidadeSelecionado || {});
    return funcionalidade;
  };
}

servicesModule.service('SessaoService', SessaoService);
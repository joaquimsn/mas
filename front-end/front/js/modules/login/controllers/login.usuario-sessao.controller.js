'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function UsuarioSessaoController(AuthService, SessaoService, $window) {
  var mv = this;

  function carregarUsuario() {
    mv.usuarioLogado = SessaoService.getUsuario();
  }

  function carregarProjeto() {
    mv.projetoContaSelecionado = SessaoService.getProjeto();
  }

  mv.sair = function() {
    AuthService.logout();
    $window.location.reload();
  };

  function init() {
    carregarUsuario();
    carregarProjeto();
  }

  init();
}

controllersModule.controller('UsuarioSessaoController', UsuarioSessaoController);
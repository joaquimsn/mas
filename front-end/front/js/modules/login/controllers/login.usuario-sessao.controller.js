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

  mv.sair = function() {
    AuthService.logout();
    $window.location.reload();
  };

  function init() {
    carregarUsuario();
  }

  init();
}

controllersModule.controller('UsuarioSessaoController', UsuarioSessaoController);
'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function UsuarioSessaoController($rootScope, $location, systemUri, AuthService, SessaoService, ProjetoService, ModuloService, globalMessage, $window) {
  var mv = this;

  function carregarUsuario() {
    mv.usuarioLogado = SessaoService.getUsuario();
  }

  function carregarProjeto() {
    mv.projetoContaSelecionado = SessaoService.getProjeto();
  }

  function carregarModulo(modulo) {
    SessaoService.storeModulo(modulo);
    $location.path(systemUri.kanban());
  }

  function irParaKanban(projeto) {
    if(projeto) {
      SessaoService.storeProjeto(projeto);
      $rootScope.$broadcast('modoVisaoAlterado', {tipo: 'projeto'});

      ModuloService.buscarTodosPorProjeto(function(modulos) {
        if (modulos.length > 0) {
          carregarModulo(modulos[0]);
        } else {
          globalMessage.warn("O projeto não possui modulos cadastrados, para continuar cadastre um modulo");
        }
      });
    }
  }

  mv.sair = function() {
    AuthService.logout();
    $window.location.reload();
  };

  function init() {
    carregarUsuario();
    carregarProjeto();

    mv.irParaKanban = irParaKanban;

    ProjetoService.buscarTodosPorUsuario(function (projetosConta) {
      mv.projetosConta = projetosConta;
    });
  }

  init();
}

controllersModule.controller('UsuarioSessaoController', UsuarioSessaoController);
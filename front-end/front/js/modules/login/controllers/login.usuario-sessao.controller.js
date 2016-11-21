'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function UsuarioSessaoController($rootScope, $location, systemUri, $timeout, AuthService, SessaoService, ProjetoService, ModuloService, globalMessage, $window) {
  var mv = this;

  function carregarUsuario() {
    mv.usuarioLogado = SessaoService.getUsuario();
  }

  function carregarProjeto() {
    mv.projetoContaSelecionado = SessaoService.getProjeto();
  }

  function carregarModulo(modulo, reload) {
    SessaoService.storeModulo(modulo.modulo);
    $timeout(function() {
      var path = $location.path();
      if (path === systemUri.kanban() && reload) {
        $location.path(systemUri.kanban());
        $window.location.reload();
      } else {
        $location.path(systemUri.kanban());
      }
    }, 200);
  }

  function irParaKanban(projeto) {
    console.log("ir para kanban", mv.projetoContaSelecionado);
    // Remover essa solucção
    projeto = mv.projetoContaSelecionado;
    if(projeto) {
      var projetoAnterior = SessaoService.getProjeto();
      SessaoService.storeProjeto(projeto);
      $rootScope.$broadcast('modoVisaoAlterado', {tipo: 'projeto'});
      
      ModuloService.buscarTodosPorProjeto(function(modulos) {
        if (modulos.length > 0) {
          carregarModulo(modulos[0], projetoAnterior._id !== projeto._id);
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

  function buscarProjetosUsuarioCb(promisse) {
    promisse.success(function (projetos) {
     mv.projetosConta = projetos;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar');
      console.log(err);
    });
  }

  function init() {
    carregarUsuario();
    carregarProjeto();

    mv.irParaKanban = irParaKanban;

    ProjetoService.buscarTodosPorUsuario(buscarProjetosUsuarioCb);
  }

  init();
}

controllersModule.controller('UsuarioSessaoController', UsuarioSessaoController);
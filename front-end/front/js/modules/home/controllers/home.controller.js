'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function HomeController($rootScope, HomeService, SessaoService) {
  var mv = this;

  function notificarAlteracaoModoVisao() {
    $rootScope.$broadcast('modoVisaoAlterado', {tipo: 'geral'});
    SessaoService.storeProjeto({});
  }

  function buscarFuncionalidadeProximosDias() {
    function buscarFuncionalidadeProximosDiasCb(funcionalidades) {
      mv.funcionalidadeProximosDias = funcionalidades;
    }

    HomeService.buscarFuncionalidadesProximosDias(buscarFuncionalidadeProximosDiasCb);
  }

  function buscarProjetos() {
    function buscarProjetosCb(projetos) {
      mv.projetosUsuario = projetos;
      console.log(projetos);
    }

    HomeService.buscarProjetos(buscarProjetosCb);
  }

  function init() {
    notificarAlteracaoModoVisao();

    buscarFuncionalidadeProximosDias();
    buscarProjetos();
  }
  init();
}

controllersModule.controller('HomeController', HomeController);
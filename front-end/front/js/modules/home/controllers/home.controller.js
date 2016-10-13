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

  function init() {
    notificarAlteracaoModoVisao();
  }
  init();
}

controllersModule.controller('HomeController', HomeController);
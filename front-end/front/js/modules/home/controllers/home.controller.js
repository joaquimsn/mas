'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function HomeController(HomeService, AcessoService) {
  var mv = this;

  function init() {
    AcessoService.salvarModoVisao({tipo: 'geral'});
  }
  init();
}

controllersModule.controller('HomeController', HomeController);
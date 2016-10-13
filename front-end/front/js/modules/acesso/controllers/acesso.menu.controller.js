'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function AcessoMenuController($scope, AcessoService) {
  var mv = this;

  function carregarMenus() {
    function buscarMenusCb(menus) {
      mv.menus = menus;
    }

    if(AcessoService.isModoVisaoGeral()) {
      AcessoService.menusVisaoGeral(buscarMenusCb);
    } else {
       AcessoService.menusVisaoProjeto(buscarMenusCb);
    }
  }

  function mudarModoVisaoMenus() {
    $scope.$on('modoVisaoAlterado', function(event, modo) {
      AcessoService.salvarModoVisao(modo);
      carregarMenus();
    });
  }

  function init() {
    carregarMenus();
    mudarModoVisaoMenus();
  }
  init();
}

controllersModule.controller('AcessoMenuController', AcessoMenuController);
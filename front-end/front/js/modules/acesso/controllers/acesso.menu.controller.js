'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function AcessoMenuController(AcessoService) {
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

  function init() {
    carregarMenus();
  }
  init();
}

controllersModule.controller('AcessoMenuController', AcessoMenuController);
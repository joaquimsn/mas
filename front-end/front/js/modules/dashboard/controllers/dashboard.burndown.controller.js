'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function DashboardBurndownController($scope, DashboardService, ModuloService) {
  var mv = this;

  function buscarModulos() {
    mv.moduloSelecionado = {};
    function buscarModuloCb(projetoModulos) {
      mv.projetoModulos = projetoModulos;
    }

    ModuloService.buscarTodosPorProjeto(buscarModuloCb);
  }

  function filtrarModulo(modulo) {
    mv.burndown = undefined;
    function criarBurndownCb(burndown) {
      console.log(burndown);
      mv.burndown = burndown;
    }
    console.log(modulo);
    DashboardService.criarBurndown(criarBurndownCb, modulo);
  }

  function init() {
    mv.filtrarModulo = filtrarModulo;

    buscarModulos();
  }
  init();
}

controllersModule.controller('DashboardBurndownController', DashboardBurndownController);

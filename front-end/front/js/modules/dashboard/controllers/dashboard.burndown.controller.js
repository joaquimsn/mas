'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function DashboardBurndownController($scope, DashboardService, ModuloService) {
  var mv = this;

  function tiposVisualizacao() {
    return [
      {display: "Pontos", value: "pontos", codigo: 1},
      {display: "tarefas", value: "tarefas", codigo: 2}
    ];
  }

  function tiposPeriodos() {
    return [
      {display: "Dias", value: "dias", codigo: 1},
      {display: "Semanas", value: "semanas", codigo: 2}
    ];
  }

  function buscarModulos() {
    mv.moduloSelecionado = {};
    function buscarModuloCb(projetoModulos) {
      mv.projetoModulos = projetoModulos;
    }
    
    ModuloService.buscarTodosPorProjeto(buscarModuloCb);
  }

  function montarBurndown() {
    mv.burndown = undefined;
    function criarBurndownCb(burndown) {
      console.log(burndown);
      mv.burndown = burndown;
    }

    if(mv.moduloSelecionado &&
      mv.tipoVisualizacaoSelecionado && 
      mv.tipoPeriodoSelecionado) {

      DashboardService.criarBurndown(criarBurndownCb, mv.moduloSelecionado, mv.tipoVisualizacaoSelecionado, mv.tipoPeriodoSelecionado);
    }
  }

  function init() {
    mv.montarBurndown = montarBurndown;

    mv.moduloSelecionado;
    mv.tipoVisualizacaoSelecionado;
    mv.tipoPeriodoSelecionado;

    mv.tiposVisualizacao = tiposVisualizacao();
    mv.tiposPeriodos = tiposPeriodos();


    buscarModulos();
  }
  init();
}

controllersModule.controller('DashboardBurndownController', DashboardBurndownController);

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
      {display: "Tarefas", value: "tarefas", codigo: 2},
      {display: "Horas", value: "horas", codigo: 3}
    ];
  }

  function tiposPeriodos() {
    return [
      {display: "Dias", value: "dias", codigo: 1},
      {display: "Semanas", value: "semanas", codigo: 2}
    ];
  }

  function buscarFuncionalidades(modulo) {
     mv.funcionalidadeSelecionada = undefined;
    function buscarFuncionalidadesCb(modulo) {
      mv.funcionalidades = modulo.funcionalidades;
    }

    var filtro = {
      _id: modulo._id
    };

    ModuloService.filtrar(buscarFuncionalidadesCb, filtro);
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
      mv.funcionalidadeSelecionada &&
      mv.tipoVisualizacaoSelecionado && 
      mv.tipoPeriodoSelecionado) {

      DashboardService.criarBurndown(criarBurndownCb, mv.moduloSelecionado, mv.funcionalidadeSelecionada, mv.tipoVisualizacaoSelecionado, mv.tipoPeriodoSelecionado);
    }
  }

  function init() {
    mv.montarBurndown = montarBurndown;
    mv.buscarFuncionalidades = buscarFuncionalidades;

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

'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function DashboardBurndownController($scope, DashboardService, ModuloService) {
  var mv = this;
  
  function tiposVisualizacaoFuncionalidade() {
    return [
      {display: "Pontos", value: "pontos", codigo: 1}
    ];
  }

  function tiposVisualizacaoTarefa() {
    return [
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
    mv.tiposVisualizacao = tiposVisualizacaoFuncionalidade();

    mv.funcionalidadeSelecionada = undefined;
    function buscarFuncionalidadesCb(modulo) {
      mv.funcionalidades = modulo[0].funcionalidades;
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

    if(mv.funcionalidadeSelecionada && mv.tipoVisualizacaoSelecionado.codigo === 1) {
      mv.tiposVisualizacao = tiposVisualizacaoTarefa();
    }

    if(mv.moduloSelecionado &&
      mv.funcionalidadeSelecionada &&
      mv.tipoVisualizacaoSelecionado && 
      mv.tipoPeriodoSelecionado) {

      mv.dataInicio = new Date(mv.funcionalidadeSelecionada.dataInicio);
      mv.dataFim = new Date(mv.funcionalidadeSelecionada.dataFim);

      DashboardService.criarBurndown(criarBurndownCb, mv.moduloSelecionado, mv.funcionalidadeSelecionada, mv.tipoVisualizacaoSelecionado, mv.tipoPeriodoSelecionado);
    }

    if(mv.moduloSelecionado &&
      !mv.funcionalidadeSelecionada &&
      mv.tipoVisualizacaoSelecionado && 
      mv.tipoPeriodoSelecionado) {

      mv.dataInicio = new Date(mv.moduloSelecionado.dataInicio);
      mv.dataFim = new Date(mv.moduloSelecionado.dataFim);

      DashboardService.criarBurndownPontos(criarBurndownCb, mv.moduloSelecionado, mv.tipoVisualizacaoSelecionado, mv.tipoPeriodoSelecionado);
    }
  }

  function init() {
    mv.montarBurndown = montarBurndown;
    mv.buscarFuncionalidades = buscarFuncionalidades;

    mv.moduloSelecionado;
    mv.tipoVisualizacaoSelecionado;
    mv.tipoPeriodoSelecionado;

    mv.tiposVisualizacao = tiposVisualizacaoFuncionalidade();
    mv.tiposPeriodos = tiposPeriodos();


    buscarModulos();
  }
  init();
}

controllersModule.controller('DashboardBurndownController', DashboardBurndownController);

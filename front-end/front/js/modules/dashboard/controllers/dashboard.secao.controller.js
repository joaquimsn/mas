'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function DashboardSecaoController($scope, $location, systemUri, $timeout, DashboardService, ProjetoService, ModuloService, KanbanService, SessaoService) {
  var mv = this;

  function buscarProjetos() {
    function buscarProjetosCb(projetosConta) {
      mv.projetosConta = projetosConta;
    }

    ProjetoService.buscarTodosParaRelatorio(buscarProjetosCb);
  }

  function buscarModulosPorProjeto(projeto) {
    mv.projetoGraficoSelecionado = projeto;
    mv.moduloSelecionado = {};
    function buscarModuloCb(projetoModulos) {
      mv.projetoModulos = projetoModulos;
    }

    ModuloService.buscarPorProjeto(buscarModuloCb, projeto);
  }

  function buscarKanbanPorModulo(modulo) {
    mv.moduloGraficoSelecionado = modulo;
    mv.kanbanModuloSelecionado = undefined;
    function buscarKanbanPorModuloCb(kanban) {
      mv.kanbanModuloSelecionado = kanban;
    }
    
    KanbanService.buscarPorId(buscarKanbanPorModuloCb, modulo.kanban);
  }

  function irParaKanban() {
    SessaoService.storeProjeto(mv.projetoGraficoSelecionado);
    SessaoService.storeModulo(mv.moduloGraficoSelecionado);

    $timeout(function() {
      $location.path(systemUri.kanban());
    }, 200);
  }

  function init() {
    mv.buscarModulosPorProjeto = buscarModulosPorProjeto;
    mv.buscarKanbanPorModulo = buscarKanbanPorModulo;
    mv.irParaKanban = irParaKanban;
    buscarProjetos();
  }
  init();
}

controllersModule.controller('DashboardSecaoController', DashboardSecaoController);

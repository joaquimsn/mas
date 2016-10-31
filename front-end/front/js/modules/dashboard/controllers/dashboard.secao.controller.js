'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function DashboardSecaoController($scope, DashboardService, ProjetoService, ModuloService, KanbanService) {
  var mv = this;

  function buscarProjetos() {
    function buscarProjetosCb(projetosConta) {
      mv.projetosConta = projetosConta;
    }

    ProjetoService.buscarTodosParaRelatorio(buscarProjetosCb);
  }

  function buscarModulosPorProjeto(projeto) {
    mv.moduloSelecionado = {};
    function buscarModuloCb(projetoModulos) {
      mv.projetoModulos = projetoModulos;
    }

    ModuloService.buscarPorProjeto(buscarModuloCb, projeto);
  }

  function buscarKanbanPorModulo(modulo) {
    mv.kanbanModuloSelecionado = undefined;
    function buscarKanbanPorModuloCb(kanban) {
      mv.kanbanModuloSelecionado = kanban;
    }
    
    KanbanService.buscarPorId(buscarKanbanPorModuloCb, modulo.kanban);
  }

  function init() {
    mv.buscarModulosPorProjeto = buscarModulosPorProjeto;
    mv.buscarKanbanPorModulo = buscarKanbanPorModulo;

    buscarProjetos();
  }
  init();
}

controllersModule.controller('DashboardSecaoController', DashboardSecaoController);

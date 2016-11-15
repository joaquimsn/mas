'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TarefaFuncionalidadeEdicaoController($scope, $routeParams, FuncionalidadeService, ModuloService, globalMessage) {
  function cadastroCb(funcionalidade) {
    ModuloService.adicionarFuncionalidade(funcionalidade, $scope.moduloSelecionado);
    globalMessage.info('Funcionalidade cadastrada com sucesso');
    delete $scope.novaTarefafuncionalidade;
  }

  function carregarFuncionalidade(id) {
    FuncionalidadeService.buscarPorId(function(funcionalidade) {
      funcionalidade.dataInicio = funcionalidade.dataInicio ? new Date(funcionalidade.dataInicio) : funcionalidade.dataInicio;
      funcionalidade.dataFim = funcionalidade.dataFim ? new Date(funcionalidade.dataFim) : funcionalidade.dataFim;
      $scope.novaTarefaFuncionalidade = funcionalidade;
    }, id);
  }

  function cadastrar(funcionalidade) {
    FuncionalidadeService.cadastrar(cadastroCb, funcionalidade);
  }

  function inicializar() {
    $scope.cadastrar = cadastrar;
    $scope.edicao = true;
    
    carregarFuncionalidade($routeParams.id);

    ModuloService.buscarTodosPorProjeto(function(projetoModulos) {
      $scope.projetoModulos = projetoModulos;
    });
  }
  inicializar();
}

controllersModule.controller('TarefaFuncionalidadeEdicaoController', TarefaFuncionalidadeEdicaoController);
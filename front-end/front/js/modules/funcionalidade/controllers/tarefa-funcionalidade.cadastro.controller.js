'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TarefaFuncionalidadeCadastroController($scope, FuncionalidadeService, ModuloService, globalMessage) {
  function cadastroCb(funcionaldiade) {
    ModuloService.adicionarFuncionalidade(funcionaldiade, $scope.moduloSelecionado);
    globalMessage.info('Funcionaldiade cadastrada com sucesso');
    delete $scope.novaTarefaFuncionaldiade;
  }

  function cadastrar(funcionaldiade) {
    FuncionalidadeService.cadastrar(cadastroCb, funcionaldiade);
  }

  function inicializar() {
    $scope.cadastrar = cadastrar;

    ModuloService.buscarTodosPorProjeto(function(projetoModulos) {
      $scope.projetoModulos = projetoModulos;
    });
  }
  inicializar();
}

controllersModule.controller('TarefaFuncionalidadeCadastroController', TarefaFuncionalidadeCadastroController);
'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function FuncionalidadeCadastroController(section, $scope, FuncionalidadeService, ModuloService, SessaoService) {
  function resetVariaveis() {
    $scope.novaFuncionalidade = {usuarios: [SessaoService.getUsuario()]};
    $scope.edicao = false;
    $scope.historicos = {};  
  }
  resetVariaveis();
  
  
  $scope.sectionSelecionada = section;
  
  function cadastroCb(funcionalidade) {
    console.log(funcionalidade);
    $scope.novaFuncionalidade = {usuarios: []};
    $scope.addNewTask(angular.copy(funcionalidade));

    FuncionalidadeService.cadastrarParaSecao(function(data) {
      console.log('Cadastrada no servidor com sucesso');
    }, funcionalidade, $scope.kanban, $scope.sectionSelecionada);
  }

  function buscarPorIdCb(modulo) {
    $scope.tarefaFuncionalidades = modulo.funcionalidades;
  }

  $scope.cadastrarParaSecao = function(funcionalidade) {
    $scope.closeModalCadastroFuncionalidade();
    FuncionalidadeService.cadastrar(cadastroCb, funcionalidade);
  };

  ModuloService.buscarPorId(buscarPorIdCb, SessaoService.getModulo()._id);
}

controllersModule.controller('FuncionalidadeCadastroController', FuncionalidadeCadastroController);
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
    }, funcionalidade, $scope.kanban, $scope.sectionSelecionada);
  }

  $scope.converterData = function(objeto) {
    if(objeto) {
      objeto.dataInicio = new Date(objeto.dataInicio);
      objeto.dataFim = new Date(objeto.dataFim);
    }
  };

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
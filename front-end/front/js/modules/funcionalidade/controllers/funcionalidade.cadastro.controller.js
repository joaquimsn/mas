'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function FuncionalidadeCadastroController(section, $scope, FuncionalidadeService, ModuloService) {
  $scope.sectionSelecionada = section;
  function cadastroCb(funcionalidade) {
    console.log(funcionalidade);
    $scope.novaFuncionalidade = {usuarios: []};
    $scope.addNewTask(angular.copy(funcionalidade));

    FuncionalidadeService.cadastrarParaSecao(function(data) {
      console.log('Cadastrada no servidor com sucesso');
    }, funcionalidade, $scope.kanban, $scope.sectionSelecionada);
  }

  function findModulosCb(promisse) {
    promisse.success(function (modulos) {
      $scope.modulosFiltro = modulos;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar modulos');
    });
  }

  $scope.cadastrarParaSecao = function(funcionalidade) {
    $scope.closeModalCadastroFuncionalidade();
    FuncionalidadeService.cadastrar(cadastroCb, funcionalidade);
  };

  ModuloService.findModulos(findModulosCb);
}

controllersModule.controller('FuncionalidadeCadastroController', FuncionalidadeCadastroController);
'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function FuncionalidadeController($scope, FuncionalidadeService) {
  function cadastroCb(promisse) {
    promisse.success(function (funcionalidade) {
      console.log(funcionalidade);
      alert('Funcionalidade cadastrado com sucesso');
      $scope.novaFuncionalidade = {};

      $scope.addNewTask(angular.copy(funcionalidade));

      FuncionalidadeService.cadastrarParaSecao(function(data) {
        console.log('Cadastrada no servidor com sucesso');
      }, funcionalidade, $scope.kanban, $scope.sectionSelecionada);
    });

    promisse.error(function (err) {
      alert('Falha ao cadastrar o funcionalidade');
      console.error('Erro ao buscar');
      console.error(err);
    });
  }

  $scope.cadastrarParaSecao = function(funcionalidade) {
    FuncionalidadeService.cadastrar(cadastroCb, funcionalidade)
  }
}

controllersModule.controller('FuncionalidadeController', FuncionalidadeController);
'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function FuncionalidadeController($scope, FuncionalidadeService) {
  function findKanbanCb(promisse) {
    promisse.success(function (funcionalidade) {
      $scope.funcionalidade = funcionalidade;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar');
      console.log(err);
    });
  }
  KanbanService.findKanban(findKanbanCb);
}

controllersModule.controller('FuncionalidadeController', FuncionalidadeController);
'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function KanbanController($scope, KanbanService) {
  function findKanbanCb(promisse) {
    promisse.success(function (kanban) {
      $scope.kanbanStructure = kanbanStructure;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar');
      console.log(err);
    });
  }
 /* KanbanService.findKanban(findKanbanCb);*/
}

controllersModule.controller('KanbanController', KanbanController);
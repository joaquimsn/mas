'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function KanbanController($scope, KanbanService) {
  function findKanbanCb(promisse) {
    promisse.success(function (kanban) {
      console.log(kanban);
      $scope.kanban = kanban;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar');
      console.log(err);
    });
  }

  $scope.adicionarNovaSecao = function(kanban, novo) {
    KanbanService.addSection(kanban, novo.title);
    novo = {};
  };

  $scope.kanbanSortOptions = {
    itemMoved: function (event) {
      console.log(event);
      event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.section.name;
    },
    orderChanged: function (event) {
      console.log(event);
    },
    containment: '#board'
  };

   $scope.removeTask = function (section, task) {
    KanbanService.removeTask($scope.kanban, section, task);
  };

  $scope.addNewTask = function (section) {
    KanbanService.addNewTask($scope.kanban, section);
  };

 KanbanService.findKanban(findKanbanCb);
}

controllersModule.controller('KanbanController', KanbanController);
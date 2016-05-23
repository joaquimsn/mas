'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function KanbanService(requestApiService, KanbanManipulatorFactory) {
  this.findKanban = function (cb) {
    requestApiService.get(cb, '/kanban');
  };

  this.addSection = function(kanban, sectionName) {
    KanbanManipulatorFactory.addSection(kanban, sectionName);
  };

  this.removeTask = function (kanban, section, task) {
    if (confirm('Are You sure to Delete?')) {
      KanbanManipulatorFactory.removeTaskFromColumn(kanban, section, task);
    }
  };

  this.addNewTask = function (kanban, section) {
    var task = {
      name: "adicionando nova",
      section: section.title,
      details: new Date()
    };

    KanbanManipulatorFactory.addTaskToSection(kanban, section, task.name, task.details);
  };
}

servicesModule.service('KanbanService', KanbanService);
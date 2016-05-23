'use strict';

var factoriesModule = require('./_index');

function Task(title, status, details) {
  this.name = title;
  this.status =  status;
  this.details = details;

  return this;
}

function Section(name) {
  this.title = name;
  this.tasks = [];
  return this;
}

/**
 * @ngInject
 */
function KanbanManipulatorFactory() {

  function addSection(kanban, sectionName) {
    console.log(kanban.sections);
    console.log(kanban);
    kanban.sections.push(new Section(sectionName));
  }

  function addTaskToSection (kanban, section, taskTitle, details) {
    angular.forEach(kanban.sections, function (sec) {
      if (sec.title === section.title) {
        console.log('passei');
        sec.tasks.push(new Task(taskTitle, section.name, details));
      }
    });
  }

  function removeTaskFromColumn(kanban, section, task) {
    angular.forEach(kanban.sections, function (sec) {
      if (sec.title === section.title) {
        sec.tasks.splice(sec.tasks.indexOf(task), 1);
      }
    });
  }

  return {
    addSection: addSection,
    addTaskToSection: addTaskToSection,
    removeTaskFromColumn: removeTaskFromColumn
  };
}

factoriesModule.factory('KanbanManipulatorFactory', KanbanManipulatorFactory);
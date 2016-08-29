'use strict';

var factoriesModule = require('./_index');

/**
 * @ngInject
 */
function KanbanManipulatorFactory() {

  function addSection(kanban, section) {
    console.log(kanban.secoes);
    console.log(kanban);
    kanban.secoes.push(section);
  }

  function addTaskToSection (kanban, section, task) {
    angular.forEach(kanban.secoes, function (sec) {
      if (sec._id === section._id) {
        sec.funcionalidades.push(task);
      }
    });
  }

  function removeTaskFromSection(kanban, section, task) {
    angular.forEach(kanban.secoes, function (sec) {
      if (sec._id === section._id) {
        sec.funcionalidades.splice(sec.funcionalidades.indexOf(task), 1);
      }
    });
  }

  function removeSection(kanban, section) {
    angular.forEach(kanban.secoes, function (sec, index) {
      if (sec._id === section._id) {
        kanban.secoes.splice(index, 1);
      }
    });
  }

  return {
    addSection: addSection,
    addTaskToSection: addTaskToSection,
    removeTaskFromSection: removeTaskFromSection,
    removeSection: removeSection
  };
}

factoriesModule.factory('KanbanManipulatorFactory', KanbanManipulatorFactory);
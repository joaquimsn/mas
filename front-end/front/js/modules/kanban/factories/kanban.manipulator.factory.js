'use strict';

var factoriesModule = require('./_index');

function Tarefa(titulo, status, descricao) {
  this.nome = titulo;
  this.status =  status;
  this.descricao = descricao;

  return this;
}

function Secao(nome) {
  this.nome = nome;
  this.tasks = [];

  return this;
}

/**
 * @ngInject
 */
function KanbanManipulatorFactory() {

  function addSection(kanban, sectionName) {
    console.log(kanban.secoes);
    console.log(kanban);
    kanban.secoes.push(new Secao(sectionName));
  }

  function addTaskToSection (kanban, section, taskTitle, descricao) {
    angular.forEach(kanban.secoes, function (sec) {
      if (sec.nome === section.nome) {
        console.log('passei');
        sec.tasks.push(new Tarefa(taskTitle, section.nome, descricao));
      }
    });
  }

  function removeTaskFromSection(kanban, section, task) {
    angular.forEach(kanban.secoes, function (sec) {
      if (sec.nome === section.nome) {
        sec.tasks.splice(sec.tasks.indexOf(task), 1);
      }
    });
  }

  return {
    addSection: addSection,
    addTaskToSection: addTaskToSection,
    removeTaskFromSection: removeTaskFromSection
  };
}

factoriesModule.factory('KanbanManipulatorFactory', KanbanManipulatorFactory);
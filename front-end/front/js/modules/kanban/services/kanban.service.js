'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function KanbanService(requestApiService, KanbanManipulatorFactory) {
  this.findKanban = function (cb) {
    requestApiService.get(cb, '/kanban/Modulo');
  };

  this.addSection = function(kanban, section) {
    KanbanManipulatorFactory.addSection(kanban, section);
  };

  this.removeTask = function (kanban, section, task) {
    if (confirm('Are You sure to Delete?')) {
      KanbanManipulatorFactory.removeTaskFromSection(kanban, section, task);
    }
  };

  this.removeSection = function(kanban, section) {
    function callback(promise) {
      promise.success(function (funcionalidade) {
        console.log("Seção removida da base");
      });
      promise.error(function (err) {
        console.error(err);
      });
      KanbanManipulatorFactory.removeSection(kanban, section);
    }

    requestApiService.del(callback, '/kanban/'+ kanban._id +'/secoes/' + section._id);
  }

  this.addNewTask = function (kanban, section, task) {
    KanbanManipulatorFactory.addTaskToSection(kanban, section, task);
  };

  this.cadastrarSecao = function (callback, kanban, section) {
    requestApiService.post(callback, section, '/kanban/'+ kanban._id +'/secoes');
  };

  this.alterarSecao = function(callback, secao, kanban) {
    requestApiService.putNo(callback, secao, '/kanban/'+ kanban._id +'/secoes/' + secao._id);
  };

  this.removerFuncionalidadeSecao = function(funcionalidade, kanban, secao) {
    function cb(promise) {
      promise.success(function (funcionalidade) {
        console.log("Funcionalidade removida da base");
      });
      promise.error(function (err) {
        console.error(err);
      });
    }

    var idKanban = kanban._id;
    var idSecao = secao._id;
    requestApiService.del(cb, '/kanban/' + idKanban + '/secoes/' + idSecao
      +'/funcionalidades/' + funcionalidade._id);
  };

  this.adicionarFuncionalidadeSecao = function(funcionalidade, kanban, secao) {
    function cb(promise) {
      promise.success(function (funcionalidade) {
        console.log("Funcionalidade adicionada na base");
      });
      promise.error(function (err) {
        console.error(err);
      });
    }

    var idKanban = kanban._id;
    var idSecao = secao._id;
    requestApiService.post(cb, funcionalidade, '/kanban/' + idKanban + '/secoes/' + idSecao
      +'/funcionalidades');
  }
}

servicesModule.service('KanbanService', KanbanService);
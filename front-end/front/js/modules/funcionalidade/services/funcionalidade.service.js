'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function FuncionalidadeService(requestApiService) {
  this.findFuncionalidade = function (callback) {
    requestApiService.get(callback, '/funcionalidades');
  };

  this.cadastrar = function(callback, funcionalidade) {
    console.log(funcionalidade);
    requestApiService.post(callback, funcionalidade, '/funcionalidades');
  }

  this.cadastrarParaSecao = function(callback, funcionalidade, kanban, section) {
    requestApiService.post(callback, funcionalidade, '/kanban/' + kanban._id +'/secoes/' + section._id + '/funcionalidades');
  }
}

servicesModule.service('FuncionalidadeService', FuncionalidadeService);
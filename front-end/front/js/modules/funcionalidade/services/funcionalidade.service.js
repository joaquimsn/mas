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
    requestApiService.postNo(callback, funcionalidade, '/funcionalidades');
  };

  this.cadastrarParaSecao = function(callback, funcionalidade, kanban, section) {
    requestApiService.postNo(callback, funcionalidade, '/kanban/' + kanban._id +'/secoes/' + section._id + '/funcionalidades');
  };

  this.alterar = function(callback, funcionalidade) {
    requestApiService.putNo(callback, funcionalidade, '/funcionalidades/' + funcionalidade._id);
  };

  this.registrarEvento = function(evento, funcionalidade) {
    var endPoint = '/funcionalidades/' + funcionalidade._id + '/historicos';
    console.log(evento);
    requestApiService.postNo(function(data) {console.log(data);}, evento, endPoint);
  };

  this.buscarHistorico = function(callback, funcionalidade) {
    requestApiService.getNo(callback, '/funcionalidades/' + funcionalidade._id + '/historicos');
  };

  this.adicionarComentario = function(comentario, funcionalidade) {
    var endPoint = '/funcionalidades/' + funcionalidade._id + '/comentarios';
    requestApiService.postNo(function() {}, comentario, endPoint);
  };
}

servicesModule.service('FuncionalidadeService', FuncionalidadeService);
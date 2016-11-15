'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function FuncionalidadeService(requestApiService, ModuloService) {
  this.findFuncionalidade = function (callback) {
    requestApiService.get(callback, '/funcionalidades');
  };

  this.buscarPorId = function (callback, id) {
    requestApiService.getNo(callback, '/funcionalidades/' + id);
  };

  this.cadastrar = function(callback, funcionalidade) {
    requestApiService.postNo(callback, funcionalidade, '/funcionalidades');
  };

  this.alterar = function(callback, funcionalidade) {
    requestApiService.putNo(callback, funcionalidade, '/funcionalidades/' + funcionalidade._id);
  };
  
  this.alterarStatus = function(callback, funcionalidade) {
    requestApiService.putNo(callback, funcionalidade, '/funcionalidades/' + funcionalidade._id + '/status');
  };

  this.cadastrarParaSecao = function(callback, funcionalidade, kanban, section) {
    requestApiService.postNo(callback, funcionalidade, '/kanban/' + kanban._id +'/secoes/' + section._id + '/funcionalidades');
    ModuloService.adicionarTarefa(funcionalidade);
  };

  this.registrarEvento = function(evento, funcionalidade) {
    var endPoint = '/funcionalidades/' + funcionalidade._id + '/historicos';
    requestApiService.postNo(function(data) {console.log(data);}, evento, endPoint);
  };

  this.buscarHistorico = function(callback, funcionalidade) {
    requestApiService.getNo(callback, '/funcionalidades/' + funcionalidade._id + '/historicos');
  };

  this.adicionarComentario = function(comentario, funcionalidade) {
    var endPoint = '/funcionalidades/' + funcionalidade._id + '/comentarios';
    requestApiService.postNo(function() {}, comentario, endPoint);
  };

  this.filtrar = function(callback, filtro) {
    requestApiService.postNo(callback, filtro, '/funcionalidades/filtro');
  };
}

servicesModule.service('FuncionalidadeService', FuncionalidadeService);
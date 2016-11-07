'use strict';

var servicesModule      = require('./_index');

/**
 * @ngInject
 */
function ModuloService(requestApiService, SessaoService) {
  this.findModulos = function(cb) {
    requestApiService.get(cb, '/modulos');
  };

  this.buscarPorId = function(cb, id) {
    requestApiService.getNo(cb, '/modulos/' + id);
  };

  this.buscarPorProjeto = function(callback, projeto) {
    requestApiService.getNo(callback, '/projetos/' + projeto._id + '/modulos');
  };

  this.cadastrar = function(callback, data) {
    requestApiService.post(callback, data, '/modulos');
  };

  this.alterar = function(callback, data, id) {
    requestApiService.put(callback, data, '/modulos/' + id);
  };

  this.adicionarFuncionalidade = function(funcionalidade) {
    requestApiService.putNo(function() {}, funcionalidade, '/modulos/' + SessaoService.getModulo()._id + '/funcionalidades');
  };

  this.adicionarTarefa = function(funcionalidade) {
    requestApiService.putNo(function() {}, funcionalidade, '/modulos/' + SessaoService.getModulo()._id + '/tarefas');
  };

  this.buscarTodosPorProjeto = function(callback) {
    requestApiService.getNo(callback, '/projetos/' + SessaoService.getProjeto()._id + '/modulos');
  };

  this.filtrar = function(callback, filtro) {
    requestApiService.postNo(callback, filtro, '/modulos/filtro');
  };
}

servicesModule.service('ModuloService', ModuloService);
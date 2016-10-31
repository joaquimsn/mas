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

  this.adicionarFuncionalidade = function(funcionalidade) {
    requestApiService.putNo(function() {}, funcionalidade, '/modulos/' + SessaoService.getModulo()._id + '/funcionalidades');
  };

  this.buscarTodosPorProjeto = function(callback) {
    requestApiService.getNo(callback, '/projetos/' + SessaoService.getProjeto()._id + '/modulos');
  };
}

servicesModule.service('ModuloService', ModuloService);
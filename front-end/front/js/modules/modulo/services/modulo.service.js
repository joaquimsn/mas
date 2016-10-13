'use strict';

var servicesModule      = require('./_index');

/**
 * @ngInject
 */
function ModuloService(requestApiService, SessaoService) {
  this.findModulos = function(cb) {
    requestApiService.get(cb, '/modulos');
  };

  this.cadastrar = function(callback, data) {
    requestApiService.post(callback, data, '/modulos');
  };

  this.adicionarFuncionalidade = function(funcionalidade) {
    requestApiService.putNo(function() {}, funcionalidade, '/modulos/' + SessaoService.getModulo()._id + '/funcionalidades');
  };
}

servicesModule.service('ModuloService', ModuloService);
'use strict';

var servicesModule      = require('./_index');

/**
 * @ngInject
 */
function TagService(requestApiService) {
  this.buscarTodas = function(callback) {
    requestApiService.getNo(callback, '/tags');
  };

  this.cadastrar = function(callback, tag) {
    requestApiService.postNo(callback, tag, '/tags');
  };

  this.alterar = function(callback, tag) {
    requestApiService.putNo(callback, tag, '/tags/' + tag._id);
  };

  this.remover = function(callback, tag) {
    tag.status = {status: 'Inativo', codigo: 0};
    requestApiService.putNo(callback, tag, '/tags/' + tag._id);
  };
}

servicesModule.service('TagService', TagService);
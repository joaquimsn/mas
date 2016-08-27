'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function SessaoService($window) {
  this.storageUsuario = function(usuario) {
    $window.sessionStorage.usuario = usuario;
  }

  this.getUsuario = function() {
    return JSON.parse($window.sessionStorage.usuario);
  }
}

servicesModule.service('SessaoService', SessaoService);
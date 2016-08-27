'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function LoginService($http, SessaoService) {
  this.autenticar = function(callback, credencial) {
    SessaoService.storageUsuario({nome: 'teste'});
  }
}

servicesModule.service('LoginService', LoginService);
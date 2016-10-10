'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function LoginService(requestApiService, SessaoService, AuthService) {
  this.autenticar = function(callback, credencial) {
    function autenticaoCb(promise) {
      promise.success(function (conta) {
        AuthService.storeToken(conta._id);
        SessaoService.storeUsuario(conta);

        callback(conta);
      });
      promise.error(function (err) {
        console.error('Falaha ao efetuar o login', err);
      });
    }

    requestApiService.post(autenticaoCb, credencial, '/contas/autorizacao');
  };
}

servicesModule.service('LoginService', LoginService);
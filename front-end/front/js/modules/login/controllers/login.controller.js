'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function LoginController($scope, LoginService, $window, systemUri) {
  $scope.acessar = function(credencial) {
    LoginService.autenticar(function() {

    }, credencial);
  }

  $scope.criarNovaConta = function() {
    $scope.showSignup = true;
  }

  $scope.cadastrarUsuario = function(usuario) {
    $scope.showSignup = false;
  }
}

controllersModule.controller('LoginController', LoginController);
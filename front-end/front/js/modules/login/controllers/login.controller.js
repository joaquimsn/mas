'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function LoginController($scope, LoginService, ContaService, $window, $location, systemUri) {
  $scope.acessar = function(credencial) {
    LoginService.autenticar(function() {
      $location.path(systemUri.home());
      $scope.$on("$locationChangeSuccess", function(){
        $window.location.reload();
      });
    }, credencial);
  };

  $scope.passwordHide = true;
  $scope.passwordToggle = function () {
    $scope.passwordHide = !$scope.passwordHide;
  };

  $scope.cadastrarConta = function(conta) {
    function cadastrarCb() {
      console.log('Cadastro realizado com sucesso');
    }

    ContaService.cadastrar(cadastrarCb, conta);
  };
}

controllersModule.controller('LoginController', LoginController);
'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function LoginController($scope, LoginService, ContaService, globalMessage, emailBuilder, $window, $location, systemUri) {
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
    function cadastrarCb(conta) {
      $scope.cadastroSucesso = true;
      globalMessage.info('Cadastro realizado com sucesso');
      //emailBuilder.buildRegisterConfirmation(conta);
    }

    ContaService.cadastrar(cadastrarCb, conta);
  };
}

controllersModule.controller('LoginController', LoginController);
'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function LoginController($scope, LoginService, ContaService, globalMessage, emailBuilder, $window, $location, systemUri) {
  var path = $location.path();
  if(path.startsWith(systemUri.loginAlteracaoSenha(''))) {
    ContaService.buscarPorId(function(conta) {
      conta.senha = '';
      conta.nome = '';
      $scope.conta = conta;
    }, path.replace(systemUri.loginAlteracaoSenha(''), ''));
  }

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

  $scope.alterar = function(conta) {
    function alterarrCb(conta) {
      $scope.cadastroSucesso = true;
      $scope.loginAlteracaoSenha = false;
      
      globalMessage.info('Conta alterada com sucesso');
      //emailBuilder.buildRegisterConfirmation(conta);
    }

    ContaService.alterar(alterarrCb, conta);
  };
}

controllersModule.controller('LoginController', LoginController);
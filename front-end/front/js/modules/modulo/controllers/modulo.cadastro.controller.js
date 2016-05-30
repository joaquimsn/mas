'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ModuloCadastroController($scope, ModuloService) {
  function cadastroCb(promisse) {
    promisse.success(function (modulo) {
      console.log(modulo);
      alert('Modulo cadastrado com sucesso');
      delete $scope.novoModulo;
    });
    promisse.error(function (err) {
      alert('Falha ao cadastrar o modulo');
      console.log('Erro ao buscar');
      console.log(err);
    });
  }

  $scope.cadastrar = function(modulo) {
    ModuloService.cadastrar(cadastroCb, modulo);
  }
}

controllersModule.controller('ModuloCadastroController', ModuloCadastroController);
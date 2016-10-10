'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ModuloCadastroController($scope, ModuloService) {
  function cadastroCb(promisse) {
    promisse.success(function (modulo) {
      console.log('Modulo cadastrado com sucesso', modulo);
      delete $scope.novoModulo;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar');
      console.log(err);
    });
  }

  $scope.cadastrar = function(modulo) {
    ModuloService.cadastrar(cadastroCb, modulo);
  };
}

controllersModule.controller('ModuloCadastroController', ModuloCadastroController);
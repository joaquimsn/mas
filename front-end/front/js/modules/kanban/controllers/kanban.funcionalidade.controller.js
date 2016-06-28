'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function FuncionalidadeController($scope, Funcionalidade) {
  function cadastroCb(promisse) {
    promisse.success(function (funcionalidade) {
      console.log(funcionalidade);
      alert('Modulo cadastrado com sucesso');
      delete $scope.novoModulo;
    });
    promisse.error(function (err) {
      alert('Falha ao cadastrar o funcionalidade');
      console.log('Erro ao buscar');
      console.log(err);
    });
  }

  $scope.cadastrar = function(funcionalidade) {
    Funcionalidade.cadastrar(cadastroCb, funcionalidade);
  }
}

controllersModule.controller('FuncionalidadeController', FuncionalidadeController);
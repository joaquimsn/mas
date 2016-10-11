'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ModuloCadastroController($scope, ModuloService, globalMessage) {
  function cadastroCb(promisse) {
    promisse.success(function (projeto) {
      globalMessage.info("Projeto cadastrado com sucesso");
      delete $scope.novoProjeto;
    });
    promisse.error(function (err) {
      globalMessage.error("Não foi possível cadastrar o Porjeto tente novamente.");
      console.log(err);
    });
  }

  $scope.cadastrar = function(modulo) {
    ModuloService.cadastrar(cadastroCb, modulo);
  };
}

controllersModule.controller('ModuloCadastroController', ModuloCadastroController);
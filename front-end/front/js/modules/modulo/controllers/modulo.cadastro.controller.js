'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ModuloCadastroController($scope, ModuloService, ProjetoService, globalMessage) {
  function cadastroCb(promisse) {
    promisse.success(function (modulo) {
      ProjetoService.adicionarModulo(modulo);
      globalMessage.info('Modulo cadastrado com sucesso');
      delete $scope.novoModulo;
    });
    promisse.error(function (err) {
      globalMessage.error('Falha ao cadastrar o modulo, tente novamente');
      console.log('Erro ao cadastrar modulo', err);
    });
  }

  $scope.cadastrar = function(modulo) {
    ModuloService.cadastrar(cadastroCb, modulo);
  };
}

controllersModule.controller('ModuloCadastroController', ModuloCadastroController);
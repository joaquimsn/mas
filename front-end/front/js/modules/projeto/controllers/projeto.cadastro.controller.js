'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ProjetoCadastroController($scope, ProjetoService, globalMessage, SessaoService, ContaService) {
  function cadastroCb(promisse) {
    promisse.success(function (projeto) {
      ContaService.adicionarProjeto(projeto, SessaoService.getUsuario()._id);
      
      globalMessage.info("Projeto cadastrado com sucesso");
      delete $scope.novoProjeto;
    });
    promisse.error(function (err) {
      globalMessage.error("Não foi possível cadastrar o Porjeto tente novamente.");
      console.log(err);
    });
  }
  
  $scope.cadastrar = function(modulo) {
    ProjetoService.cadastrar(cadastroCb, modulo);
  };
}

controllersModule.controller('ProjetoCadastroController', ProjetoCadastroController);
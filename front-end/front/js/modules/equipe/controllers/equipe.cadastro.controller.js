'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function EquipeCadastroController($scope, EquipeService, globalMessage, SessaoService, ContaService) {
  function cadastroCb(promisse) {
    promisse.success(function (equipe) {
      ContaService.adicionarEquipe(equipe, SessaoService.getUsuario()._id);
      
      globalMessage.info("Equipe cadastrado com sucesso");
      delete $scope.novoEquipe;
    });
    promisse.error(function (err) {
      globalMessage.error("Não foi possível cadastrar a Equipe tente novamente.");
      console.log(err);
    });
  }
  
  $scope.cadastrar = function(equipe) {
    EquipeService.cadastrar(cadastroCb, equipe);
  };
}

controllersModule.controller('EquipeCadastroController', EquipeCadastroController);
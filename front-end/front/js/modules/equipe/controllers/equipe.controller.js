'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function EquipeController($scope, $location, systemUri, EquipeService) {
  function buscarEquipesUsuarioCb(promisse) {
    promisse.success(function (equipes) {
      $scope.equipes = equipes;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar');
      console.log(err);
    });
  }

  $scope.abrirModalUsuarios = function(equipe) {

  };

  EquipeService.buscarTodosPorUsuario(buscarEquipesUsuarioCb);
}

controllersModule.controller('EquipeController', EquipeController);
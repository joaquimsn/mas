'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function EquipeController($scope, $location, systemUri, EquipeService, globalMessage, $mdDialog) {
  function buscarEquipesUsuarioCb(equipes) {
     $scope.equipes = equipes;
  }

  function adicionarEquipeParaLista(equipe) {
    EquipeService.buscarEquipes(buscarEquipesUsuarioCb);
  }

  function cadastrar(equipe) {
    EquipeService.cadastrar(function(retorno) {
      $scope.novaEquipe = {};
      adicionarEquipeParaLista(retorno);
      globalMessage.info('Equipe cadastrada com sucesso');
    }, equipe);

    $scope.habilitarCadastro = false;
  }

  function alterar(equipe) {
    equipe.editar = !equipe.editar;
    EquipeService.alterar(function(retorno) {
      globalMessage.info('Equipe alterada com sucesso');
    }, equipe);
  }

  function abrirModalUsuarios(ev, equipe) {
    $mdDialog.show({
          controller: 'EquipeMembroController',
          templateUrl: 'partials/equipe/equipe-membros',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          preserveScope: false,
          locals: { equipe: equipe },
          fullscreen: true // Only for -xs, -sm breakpoints.
      })
      .then(function(retorno) {
          // fallback
      }, function() {
          // Modal fechado
    });
  }

  function inicializar() {
    $scope.novaEquipe = {};
      

    $scope.abrirModalUsuarios = abrirModalUsuarios; 
    $scope.cadastrar= cadastrar;
    $scope.alterar = alterar;

    EquipeService.buscarEquipes(buscarEquipesUsuarioCb);
  }
  inicializar();
}

controllersModule.controller('EquipeController', EquipeController);
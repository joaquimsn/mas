'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function EquipeMembroController(equipe, $scope, EquipeService, globalMessage) {
  function buscarMembrosCb(membros) {
    $scope.membros = membros;
  }


  function inicializar() {
    $scope.equipeSelecionada = equipe;

    EquipeService.buscarMembros(buscarMembrosCb, equipe);
  }
  inicializar();
}

controllersModule.controller('EquipeMembroController', EquipeMembroController);
'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function EquipeSelecaoController($scope, $element, EquipeService) {
  var mv = this;

  function buscarEquipesCb(equipes) {
    $scope.equipesParaSelecao = equipes;
  }

  $scope.searchTerm = '';
  $scope.clearSearchTerm = function() {
    $scope.searchTerm = '';
  };
  // The md-select directive eats keydown events for some quick select
  // logic. Since we have a search input here, we don't need that logic.
  $element.find('input').on('keydown', function(ev) {
      ev.stopPropagation();
  });

  function init() {
    EquipeService.buscarEquipes(buscarEquipesCb);
  }
  init();
}

controllersModule.controller('EquipeSelecaoController', EquipeSelecaoController);
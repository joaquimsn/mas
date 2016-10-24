'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TagController($scope, $element, TagService) {
  var mv = this;

  function buscarTagsCb(tags) {
    $scope.tagsParaSelecao = tags;
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
    TagService.buscarTodas(buscarTagsCb);
  }
  init();
}

controllersModule.controller('TagController', TagController);
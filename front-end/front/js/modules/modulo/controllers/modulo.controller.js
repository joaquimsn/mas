'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ModuloController($scope, systemUri, $location, ModuloService, SessaoService, globalMessage) {
  function buscarModulosCb(projetoModulos) {
    $scope.projetoModulos = projetoModulos;

    if(projetoModulos.length === 0) {
      globalMessage.warn("O projeto não possui nenhum módulo");
    }
  }

  $scope.irParaKanban = function(modulo) {
    SessaoService.storeModulo(modulo);
    $location.path(systemUri.kanban());
  };


  ModuloService.buscarTodosPorProjeto(buscarModulosCb);

}

controllersModule.controller('ModuloController', ModuloController);
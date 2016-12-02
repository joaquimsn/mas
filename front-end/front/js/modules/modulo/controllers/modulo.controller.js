'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ModuloController($scope, systemUri, $location, ModuloService, SessaoService, globalMessage) {
  function buscarModulosCb(projetoModulos) {
    $scope.projetoModulos = projetoModulos;

    if(projetoModulos.length === 0) {
      globalMessage.warn("O projeto não possui módulos");
    }
  }

  $scope.irParaKanban = function(modulo) {
    SessaoService.storeModulo(modulo);
    $location.path(systemUri.kanban());
  };

  function goTo(modulo) {
    $location.path(systemUri.moduloAlteracao(modulo._id));
  }
  
  function inicializar() {
    $scope.goTo = goTo;
    ModuloService.buscarTodosPorProjeto(buscarModulosCb);
  }
  inicializar();

}

controllersModule.controller('ModuloController', ModuloController);
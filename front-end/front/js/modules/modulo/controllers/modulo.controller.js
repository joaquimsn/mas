'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ModuloController($scope, systemUri, $location, ModuloService, SessaoService) {
  function findModuloCb(promisse) {
    promisse.success(function (modulos) {
      $scope.modulos = modulos;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar');
      console.log(err);
    });
  }

  $scope.irParaKanban = function(modulo) {
    SessaoService.storeModulo(modulo);
    $location.path(systemUri.kanban());
  };

  ModuloService.findModulos(findModuloCb);
  //ModuloService.buscarTodosPorProjeto(findModuloCb);

}

controllersModule.controller('ModuloController', ModuloController);
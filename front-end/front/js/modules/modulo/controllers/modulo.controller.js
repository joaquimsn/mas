'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ModuloController($scope, ModuloService, $location) {
  function findModuloCb (promisse) {
    promisse.success(function (modulos) {
      $scope.modulos = modulos;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar o Modulo');
      console.log(err);
    });
  }

  /*categoryAreasService.findModulo(findModuloCb);*/
}

controllersModule.controller('ModuloController', ModuloController);
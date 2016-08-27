'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ModuloController($scope, ModuloService) {
  function findModuloCb(promisse) {
    promisse.success(function (modulos) {
      $scope.modulos = modulos;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar');
      console.log(err);
    });
  }

  ModuloService.findModulos(findModuloCb);
}

controllersModule.controller('ModuloController', ModuloController);
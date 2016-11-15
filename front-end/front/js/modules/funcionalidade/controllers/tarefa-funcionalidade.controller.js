'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TarefaFuncionalidadeController($scope, systemUri, $location, ModuloService, SessaoService, globalMessage) {
  function buscarPorModulo(modulo) {
    function buscarFuncionalidadesCb(funcionalidades) {
      $scope.funcionalidades = funcionalidades;
    }

    ModuloService.buscarTodosPorModulo(buscarFuncionalidadesCb, modulo);
  }
  
  function inicializar() {
    $scope.buscarPorModulo = buscarPorModulo;
  }
  inicializar();
}

controllersModule.controller('TarefaFuncionalidadeController', TarefaFuncionalidadeController);
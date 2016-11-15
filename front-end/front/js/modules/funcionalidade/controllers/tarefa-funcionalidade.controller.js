'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TarefaFuncionalidadeController($scope, systemUri, $location, ModuloService, SessaoService, globalMessage) {
  function buscarPorModulo(modulo) {
    function buscarFuncionalidadesCb(modulo) {
      console.log(modulo);
      $scope.funcionalidades = modulo.funcionalidades;
    }

    ModuloService.buscarPorId(buscarFuncionalidadesCb, modulo._id);
  }

  function buscarModulos() {
    function buscarModuloCb(projetoModulos) {
      $scope.projetoModulos = projetoModulos;
    }
    
    ModuloService.buscarTodosPorProjeto(buscarModuloCb);
  }

  function goTo(funcionalidade) {
    $location.path(systemUri.tarefaFuncionalidadeAlteracao(funcionalidade._id));
  }
  
  function inicializar() {
    $scope.buscarPorModulo = buscarPorModulo;
    $scope.goTo = goTo;

    buscarModulos();
  }
  inicializar();
}

controllersModule.controller('TarefaFuncionalidadeController', TarefaFuncionalidadeController);
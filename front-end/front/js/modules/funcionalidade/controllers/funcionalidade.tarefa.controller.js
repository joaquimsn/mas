'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TarefaController($scope) {
  var mv = this;
  $scope.selected = [];

  function adcionarTarefa(tarefa) {
    $scope.novaFuncionalidade.tarefas.push(tarefa);
    mv.novaTarefa = {};
  }

  mv.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      item.concluida = false;
      list.splice(idx, 1);
    }
    else {
      item.concluida = true;
      list.push(item);
    }
  };

  mv.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  mv.isIndeterminate = function() {
    return ($scope.selected.length !== 0 &&
        $scope.selected.length !== $scope.novaFuncionalidade.tarefas.length);
  };

  mv.isChecked = function() {
    return $scope.selected.length === $scope.novaFuncionalidade.tarefas.length;
  };

  mv.toggleAll = function() {
    if ($scope.selected.length === $scope.novaFuncionalidade.tarefas.length) {
      $scope.selected = [];
    } else if ($scope.selected.length === 0 || $scope.novaFuncionalidade.tarefas.length > 0) {
      $scope.selected = $scope.novaFuncionalidade.tarefas.slice(0);
    }
  };

  function init() {
    $scope.novaFuncionalidade.tarefas = $scope.novaFuncionalidade.tarefas || [];

    mv.adcionarTarefa = adcionarTarefa;

    mv.novoTarefa = {};
  }
  init();
}

controllersModule.controller('TarefaController', TarefaController);
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

  function removerTarefa(index, lista) {
    console.log("removendo tarefa");
    lista.splice(index, 1);
    $scope.alterarFuncionalidade($scope.novaFuncionalidade);
  }

  function atualizarTodas(concluida) {
    angular.forEach($scope.novaFuncionalidade.tarefas, function(item) {
      item.concluida = concluida;
    });

    $scope.alterarFuncionalidade($scope.novaFuncionalidade);
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
    console.log("Alterar func por ttare", $scope.novaFuncionalidade);
    $scope.alterarFuncionalidade($scope.novaFuncionalidade);
  };

  mv.exists = function (item, list) {
    return list.indexOf(item) > -1 || item.concluida;
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
      atualizarTodas(false);
    } else if ($scope.selected.length === 0 || $scope.novaFuncionalidade.tarefas.length > 0) {
      $scope.selected = $scope.novaFuncionalidade.tarefas.slice(0);
      atualizarTodas(true);
    }
  };

  function init() {
    $scope.novaFuncionalidade.tarefas = $scope.novaFuncionalidade.tarefas || [];

    $scope.selected = $scope.novaFuncionalidade.tarefas.filter(function(item) {
      return item.concluida;
    });

    mv.adcionarTarefa = adcionarTarefa;
    mv.removerTarefa = removerTarefa;

    mv.novoTarefa = {};
  }
  init();
}

controllersModule.controller('TarefaController', TarefaController);
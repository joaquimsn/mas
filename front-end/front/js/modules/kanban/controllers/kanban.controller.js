'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function KanbanController($scope, KanbanService, ModuloService, ngDialog) {
  $scope.novaSecao = {nome: ''};
  $scope.moduloFiltroSelecionado;
  $scope.sectionSelecionada;

  function findModulosCb(promisse) {
    promisse.success(function (modulos) {
      $scope.modulosFiltro = modulos;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar modulos');
    });
  }

  console.log("Kanban controller");

  function findKanbanCb(promisse) {
    promisse.success(function (kanban) {
      console.log(kanban);
      $scope.kanban = kanban;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar');
      console.log(err);
    });
  }

  function cadastrarSecaoCb(promise) {
    promise.success(function (secao) {
      KanbanService.addSection($scope.kanban, secao);
      $scope.novaSecao = {nome: ''};
    });
    promise.error(function (err) {
      console.error(err);
    });
  }

  $scope.adicionarNovaSecao = function(kanban, secao) {
    KanbanService.cadastrarSecao(cadastrarSecaoCb, kanban, secao);
  };

  $scope.secoesSortOptions = {
    containment: '#kanaban-secoes',
    accept: function (sourceItemHandleScope, destSortableScope) {
       console.log(sourceItemHandleScope);
       //console.log(destSortableScope);
      return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
    },
    itemMoved: function (event) {
      console.log("Secao movida");
      console.log(event);
      //event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent;
      console.log(event.dest.sortableScope.$parent.section);
    },
    orderChanged: function (event) {
      console.log("orderChange");
      console.log(event);
    },
  };

  $scope.funcionalidadeSortOptions = {
    itemMoved: function (event) {
      console.log("Funcionalidade Movida");
      event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.section.nome;

      var funcionalidade = event.source.itemScope.modelValue;
      var secaoAnterior = event.source.sortableScope.$parent.section;
      // Remove da seção anterior na base
      KanbanService.removerFuncionalidadeSecao(funcionalidade, $scope.kanban, secaoAnterior);

      // Adiciona para a nova secao
      var secaoNova = event.dest.sortableScope.$parent.section;
      KanbanService.adicionarFuncionalidadeSecao(funcionalidade, $scope.kanban, secaoNova);
    },
    orderChanged: function (event) {
      console.log("orderChange");
      console.log(event);
    }
  };

   $scope.removeTask = function (task) {
    KanbanService.removeTask($scope.kanban, $scope.sectionSelecionada, task);
  };

  $scope.addNewTask = function (task) {
    console.log(task);
    KanbanService.addNewTask($scope.kanban, $scope.sectionSelecionada, task);
  };

  $scope.removeSection = function(section) {
    if(section.funcionalidades && section.funcionalidades.length === 0) {
      KanbanService.removeSection($scope.kanban, section);
    } else {
      alert('Para remover uma seção é necessário, que ela esteja vazia');
    }
  }

  $scope.openModalTask = function(section) {
    $scope.sectionSelecionada = section;
    ngDialog.open({
      template: 'partials/kanban/funcionalidade',
      scope: $scope,
      width: '60%'
    });
  };

 KanbanService.findKanban(findKanbanCb);
 ModuloService.findModulos(findModulosCb);
}

controllersModule.controller('KanbanController', KanbanController);
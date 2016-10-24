'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TagCadastroController($scope, TagService, globalMessage) {
  function buscarTagsCb(tags) {
    $scope.tags = tags;
  }

  function adicionarTagParaLista(tag) {
    $scope.tags.push(tag);
  }

  function cadastrar(tag) {
    TagService.cadastrar(function(retorno) {
      $scope.novaTag = {};
      adicionarTagParaLista(retorno);
      globalMessage.info('Tag cadastrada com sucesso');
    }, tag);

    $scope.habilitarCadastro = false;
  }

  function alterar(tag) {
    tag.editar = !tag.editar;
    TagService.alterar(function(retorno) {
      globalMessage.info('Tag alterada com sucesso');
    }, tag);
  }

  function init() {
    $scope.novaTag = {};

    $scope.cadastrar= cadastrar;
    $scope.alterar = alterar;

    TagService.buscarTodas(buscarTagsCb);
  }
  init();
}

controllersModule.controller('TagCadastroController', TagCadastroController);
'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ModuloEdicaoController($scope, $routeParams, ModuloService, SessaoService, globalMessage) {
  ModuloService.buscarPorId(function(novo) {
    novo.dataInicio = novo.dataInicio ? new Date(novo.dataInicio) : novo.dataInicio;
    novo.dataFim = novo.dataFim ? new Date(novo.dataFim) : novo.dataFim;
  
    console.log('buscou por id', novo);
    $scope.novoModulo = novo;
  }, $routeParams.id);

  function alterarCb(promisse) {
    promisse.success(function (modulo) {
      globalMessage.info('Modulo Alterado com sucesso');
      delete $scope.novoModulo;
    });
    promisse.error(function (err) {
      globalMessage.error('Falha ao Alterar o modulo, tente novamente');
      console.log('Erro ao cadastrar modulo', err);
    });
  }

  function alterar(modulo) {
    ModuloService.alterar(alterarCb, modulo, modulo._id);
  }

  function excluir(modulo) {
    ModuloService.excluir(function(retorno) {
      globalMessage.info('Modulo removido com sucesso');
    }, SessaoService.getProjeto()._id, modulo._id);
  }

  function cadastrarGitHook(modulo) {
    ModuloService.registerGitHook(function() {
       globalMessage.info('Webhook criado com sucesso');
    }, modulo, SessaoService.getProjeto());
  }

  function carregarProjeto() {
    var projeto = SessaoService.getProjeto();
    projeto.dataInicio = new Date(projeto.dataInicio);
    
    if (projeto.dataFim) {
      projeto.dataFim = new Date(projeto.dataFim);
    } else {
      var data = new Date();
      data.setFullYear(data.getFullYear() + 2);
      projeto.dataFim = new Date(data);
    }

    $scope.projetoTelaModulo = projeto;
  }

  function inicializar() {
    $scope.cadastrar = alterar;
    $scope.excluir = excluir;
    $scope.edicao = true;
    $scope.projetoTelaModulo = SessaoService.getProjeto();
    carregarProjeto();

    $scope.cadastrarGitHook = cadastrarGitHook;
    
  }
  inicializar();


}

controllersModule.controller('ModuloEdicaoController', ModuloEdicaoController);
'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function FuncionalidadeEdicaoController(funcionalidade, $scope, FuncionalidadeService, ModuloService, SessaoService, globalMessage) {
  $scope.edicao = true;
  $scope.historicos = [];
  console.log("Funcionalidade selecionada", funcionalidade);

  funcionalidade.dataInicio = funcionalidade.dataInicio ? new Date(funcionalidade.dataInicio) : funcionalidade.dataInicio;
  funcionalidade.dataFim = funcionalidade.dataFim ? new Date(funcionalidade.dataFim) : funcionalidade.dataFim;
  funcionalidade.usuarios = funcionalidade.usuarios || [];
   
  $scope.novaFuncionalidade = funcionalidade;

  FuncionalidadeService.buscarPorId(function(func) {
    $scope.novaFuncionalidade.usuarios = func.usuarios;
    $scope.novaFuncionalidade.funcionalidade = func.funcionalidade;
  }, funcionalidade._id);
  
  function buscarPorIdCb(modulo) {
    $scope.tarefaFuncionalidades = modulo.funcionalidades;
  }

  $scope.adicionarComentario = function(comentario, funcionalidade) {
    var novoComentario = comentario;
    FuncionalidadeService.adicionarComentario(novoComentario, funcionalidade);

    var evento  = {
      acao: 'Novo comentário',
      descricao: ' comentou ' + novoComentario.mensagem
    };

    // O push não vai funcionar porque está desabilitado o watch para lista
    $scope.historicos.push(evento);
    FuncionalidadeService.registrarEvento(evento, funcionalidade);
    globalMessage.info('Comentário registrado');
    comentario = {};
  };

  $scope.syncGitHub = function(funcionalidade) {
    FuncionalidadeService.syncGitHub(function() {
      globalMessage.info('Tarefa enviada para o github com sucesso');
    }, funcionalidade, $scope.projetoKanbanSelecionado);
  };

  $scope.alterarFuncionalidade = function(funcionalidade) {
    function alterarCb(retorno) {
      globalMessage.info('Tarefa Alterada com sucesso');
      console.log('Tarefa para alterar', retorno);
    }
    FuncionalidadeService.alterar(alterarCb, funcionalidade);
  };

  FuncionalidadeService.buscarHistorico(function(historicos) {
    console.log("Historicos", historicos);
    $scope.historicos = historicos || [];
  }, funcionalidade);

   $scope.converterData = function(objeto) {
    if(objeto) {
      objeto.dataInicio = new Date(objeto.dataInicio);
      objeto.dataFim = new Date(objeto.dataFim);
    }
  };

  ModuloService.buscarPorId(buscarPorIdCb, SessaoService.getModulo()._id);
}

controllersModule.controller('FuncionalidadeEdicaoController', FuncionalidadeEdicaoController);
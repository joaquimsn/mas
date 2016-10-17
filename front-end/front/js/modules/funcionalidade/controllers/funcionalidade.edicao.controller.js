'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function FuncionalidadeEdicaoController(funcionalidade, $scope, FuncionalidadeService, ModuloService, globalMessage) {
  $scope.edicao = true;
  $scope.historicos = [];
  console.log("Funcionalidade selecionada", funcionalidade);

  funcionalidade.dataInicio = funcionalidade.dataInicio ? new Date(funcionalidade.dataInicio) : funcionalidade.dataInicio;
  funcionalidade.dataFim = funcionalidade.dataFim ? new Date(funcionalidade.dataFim) : funcionalidade.dataFim;
  funcionalidade.usuarios = funcionalidade.usuarios || []; 
  $scope.novaFuncionalidade = funcionalidade;

  FuncionalidadeService.buscarPorId(function(func) {
    console.log('buscou por id', func);
    $scope.novaFuncionalidade.usuarios = func.usuarios;
  }, funcionalidade._id);
  
  function findModulosCb(promisse) {
    promisse.success(function (modulos) {
      $scope.modulosFiltro = modulos;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar modulos');
    });
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

  $scope.alterarFuncionalidade = function(funcionalidade) {
    function alterarCb() {
      globalMessage.info('Funcionalidade Alterada com sucesso');
    }
    FuncionalidadeService.alterar(alterarCb, funcionalidade);
  };

  FuncionalidadeService.buscarHistorico(function(historicos) {
    console.log("Historicos", historicos);
    $scope.historicos = historicos || [];
  }, funcionalidade);

  ModuloService.findModulos(findModulosCb);
}

controllersModule.controller('FuncionalidadeEdicaoController', FuncionalidadeEdicaoController);
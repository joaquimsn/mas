'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function FuncionalidadeEdicaoController(funcionalidade, $scope, FuncionalidadeService, ModuloService) {
  $scope.edicao = true;

  funcionalidade.dataInicio = new Date(funcionalidade.dataInicio);
  funcionalidade.dataFim = new Date(funcionalidade.dataFim);
  $scope.novaFuncionalidade = funcionalidade;
  
  function findModulosCb(promisse) {
    promisse.success(function (modulos) {
      $scope.modulosFiltro = modulos;
      console.log(modulos);
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar modulos');
    });
  }

  $scope.adicionarComentario = function(comentario, funcionalidade) {
    FuncionalidadeService.adicionarComentario(comentario, funcionalidade);

    var evento  = {
      acao: 'Novo comentário',
      descricao: ' comentou ' + comentario
    };

    $scope.historicos.push(evento);
    FuncionalidadeService.registrarEvento(evento, funcionalidade);
  };

  FuncionalidadeService.buscarHistorico(function(historicos) {
    console.log(historicos);
    $scope.historicos = historicos || [];
  }, funcionalidade);

  ModuloService.findModulos(findModulosCb);
}

controllersModule.controller('FuncionalidadeEdicaoController', FuncionalidadeEdicaoController);
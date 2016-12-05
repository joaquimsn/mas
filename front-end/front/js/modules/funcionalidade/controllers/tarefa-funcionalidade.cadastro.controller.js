'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TarefaFuncionalidadeCadastroController($scope, FuncionalidadeService, ModuloService, globalMessage) {
  function cadastroCb(funcionaldiade) {
    ModuloService.adicionarFuncionalidade(funcionaldiade, $scope.moduloSelecionadoParaFuncionalidade);
    globalMessage.info('Funcionaldiade cadastrada com sucesso');
    delete $scope.novaTarefaFuncionaldiade;
  }

  function cadastrar(funcionaldiade) {
    $scope.moduloSelecionadoParaFuncionalidade = funcionaldiade.moduloSelecionado;
    FuncionalidadeService.cadastrar(cadastroCb, funcionaldiade);
  }

  function converterData(objeto) {
    if(objeto) {
      objeto.dataInicio = new Date(objeto.dataInicio);
      objeto.dataFim = new Date(objeto.dataFim);
      console.log('modulo', objeto);
      $scope.novaTarefaFuncionalidade.moduloSelecionado = objeto;
    }
  }

  function inicializar() {
    $scope.novaTarefaFuncionalidade = {};
    
    $scope.cadastrar = cadastrar;
    $scope.converterData = converterData;
    $scope.cadastro = true;

    ModuloService.buscarTodosPorProjeto(function(projetoModulos) {
      $scope.projetoModulos = projetoModulos;
    });
  }
  inicializar();
}

controllersModule.controller('TarefaFuncionalidadeCadastroController', TarefaFuncionalidadeCadastroController);
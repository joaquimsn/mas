'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ModuloCadastroController($scope, ModuloService, ProjetoService, SessaoService, globalMessage) {
  function cadastroCb(promisse) {
    promisse.success(function (modulo) {
      ProjetoService.adicionarModulo(modulo);
      globalMessage.info('Modulo cadastrado com sucesso');
      delete $scope.novoModulo;
    });
    promisse.error(function (err) {
      globalMessage.error('Falha ao cadastrar o modulo, tente novamente');
      console.log('Erro ao cadastrar modulo', err);
    });
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

  $scope.cadastrar = function(modulo) {
     if(modulo.dataFim && modulo.dataFim < modulo.dataInicio) {
      globalMessage.warn('A data fim não pode ser menor que a data de início.');
    } else {
      ModuloService.cadastrar(cadastroCb, modulo);
    }
  };

  function inicializar() {
    $scope.cadastro = true;
    carregarProjeto();
  }
  inicializar();
}

controllersModule.controller('ModuloCadastroController', ModuloCadastroController);
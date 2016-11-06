'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ModuloCadastroController(modulo, $scope, ModuloService, globalMessage) {
  ModuloService.buscarPorId(function(novo) {
    novo.dataInicio = novo.dataInicio ? new Date(novo.dataInicio) : novo.dataInicio;
    novo.dataFim = novo.dataFim ? new Date(novo.dataFim) : novo.dataFim;
  
    console.log('buscou por id', novo);
    $scope.novnModulo = novo;
  }, modulo._id);

  function cadastroCb(promisse) {
    promisse.success(function (modulo) {
      globalMessage.info('Modulo Alterado com sucesso');
      delete $scope.novoModulo;
    });
    promisse.error(function (err) {
      globalMessage.error('Falha ao Alterar o modulo, tente novamente');
      console.log('Erro ao cadastrar modulo', err);
    });
  }

  $scope.cadastrar = function(modulo) {
    ModuloService.alterar(cadastroCb, modulo, modulo._id);
  };
}

controllersModule.controller('ModuloCadastroController', ModuloCadastroController);
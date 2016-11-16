'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ProjetoEdicaoController($scope, $routeParams, ProjetoService, globalMessage) {
   function alterarCb(projeto) {
    globalMessage.info('Projeto alterado com sucesso');
    delete $scope.novoProjeto;
  }

  function carregarFuncionalidade(id) {
    ProjetoService.buscarPorId(function(projeto) {
      projeto.dataInicio = projeto.dataInicio ? new Date(projeto.dataInicio) : projeto.dataInicio;
      projeto.dataFim = projeto.dataFim ? new Date(projeto.dataFim) : projeto.dataFim;
      $scope.novoProjeto = projeto;
    }, id);
  }

  function copiarUsuariosEquipe(projeto) {
    projeto.usuarios = [] || projeto.usuarios;
    angular.forEach(projeto.equipes, function(item) {
      if(item.membros) {
        projeto.usuarios = projeto.usuarios.concat(item.membros);
      }
    });
  }

  function alterar(projeto) {
    copiarUsuariosEquipe(projeto);
    console.log('projeto para alterar', projeto);
    ProjetoService.alterar(alterarCb, projeto);
  }

  function inicializar() {
    $scope.cadastrar = alterar;
    $scope.edicao = true;
    
    carregarFuncionalidade($routeParams.id);
  }
  inicializar();
}

controllersModule.controller('ProjetoEdicaoController', ProjetoEdicaoController);
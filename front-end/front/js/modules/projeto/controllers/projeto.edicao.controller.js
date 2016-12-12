'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ProjetoEdicaoController($scope, $routeParams, ProjetoService, SessaoService, globalMessage) {
   function alterarCb(projeto) {
    console.log('projeto alterado', projeto);
    globalMessage.info('Projeto alterado com sucesso');
    delete $scope.novoProjeto;
  }

  function carregarFuncionalidade(id) {
    ProjetoService.buscarPorId(function(projeto) {
      projeto.dataInicio = projeto.dataInicio ? new Date(projeto.dataInicio) : projeto.dataInicio;
      projeto.dataFim = projeto.dataFim ? new Date(projeto.dataFim) : projeto.dataFim;
      $scope.novoProjeto = projeto;
      $scope.equipesJaCadastradas = projeto.equipes;
    }, id);
  }

  function verificarUsuariosParaVinculo(equipe, projeto) {
    var naoVinculado = true;
    angular.forEach($scope.equipesJaCadastradas, function(item) {
      if(item._id === equipe._id) {
        naoVinculado = false;
      }
    });

    if(naoVinculado) {
      projeto.usuariosParaVinculo = projeto.usuariosParaVinculo.concat(equipe.membros);
    }
  }

  function copiarUsuariosEquipe(projeto) {
    projeto.usuarios = [];
    projeto.usuariosParaVinculo = [];

    angular.forEach(projeto.equipes, function(item) {
      if(item.membros) {
        projeto.usuarios = projeto.usuarios.concat(item.membros);
        verificarUsuariosParaVinculo(item, projeto);
      }
    });
  }

  function alterar(projeto) {
     if(projeto.dataFim && projeto.dataFim < projeto.dataInicio) {
      globalMessage.warn('A data fim não pode ser menor que a data de início.');
    } else {
      copiarUsuariosEquipe(projeto);
      ProjetoService.alterar(alterarCb, projeto);
    }
  }

  function inicializar() {
    $scope.cadastrar = alterar;
    $scope.edicao = true;
    
    var usuario = SessaoService.getUsuario();
    
    if(usuario.configuracoes) {
      $scope.repositoriosFiltro = [usuario.configuracoes.github];
    }
    
    carregarFuncionalidade($routeParams.id);
  }
  inicializar();
}

controllersModule.controller('ProjetoEdicaoController', ProjetoEdicaoController);
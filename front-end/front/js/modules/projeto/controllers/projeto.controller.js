'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ProjetoController($scope, ProjetoService, SessaoService, AcessoService) {
  function buscarProjetosUsuarioCb(promisse) {
    promisse.success(function (projetos) {
      $scope.projetos = projetos;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar');
      console.log(err);
    });
  }

  $scope.abrirKanban = function(projeto) {
    if(projeto) {
      SessaoService.storeProjeto(projeto);
      AcessoService.salvarModoVisao({tipo: 'projeto'});
    }
  };

  ProjetoService.buscarTodosPorUsuario(buscarProjetosUsuarioCb);
}

controllersModule.controller('ProjetoController', ProjetoController);
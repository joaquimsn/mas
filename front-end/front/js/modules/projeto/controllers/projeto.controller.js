'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ProjetoController($scope, $location, systemUri, ProjetoService, SessaoService, AcessoService) {
  function buscarProjetosUsuarioCb(promisse) {
    promisse.success(function (projetos) {
      console.log('Projetos', projetos);
      $scope.projetos = projetos;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar');
      console.log(err);
    });
  }

  $scope.abrirKanban = function(projeto) {
    if(projeto) {
      console.log('Projeto Para abrir',projeto);
      SessaoService.storeProjeto(projeto);
      AcessoService.salvarModoVisao({tipo: 'projeto'});
      $location.path(systemUri.kanban());
    }
  };

  ProjetoService.buscarTodosPorUsuario(buscarProjetosUsuarioCb);
}

controllersModule.controller('ProjetoController', ProjetoController);
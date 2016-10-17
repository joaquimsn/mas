'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ProjetoController($scope, $rootScope, $location, systemUri, ProjetoService, SessaoService) {
  function buscarProjetosUsuarioCb(promisse) {
    promisse.success(function (projetos) {
      $scope.projetosUsuario = projetos;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar');
      console.log(err);
    });
  }

  $scope.irParaModulos = function(projeto) {
    if(projeto) {
      SessaoService.storeProjeto(projeto);
      $rootScope.$broadcast('modoVisaoAlterado', {tipo: 'projeto'});

      $location.path(systemUri.modulo());
    }
  };

  ProjetoService.buscarTodosPorUsuario(buscarProjetosUsuarioCb);
}

controllersModule.controller('ProjetoController', ProjetoController);
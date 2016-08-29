'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function UsuarioSearchController($scope, UsuarioService) {
  var self = $scope;
  var cachedQuery;

  UsuarioService.buscarUsuarioDisponivelParaProjeto(function(usuarios) {
     self.todosUsuarios = usuarios;
  });

  self.usuarios = [];
  self.querySearch = querySearch;

  /**
   * Search for contacts; use a random delay to simulate a remote call
   */
  function querySearch (criteria) {
    cachedQuery = cachedQuery || criteria;
    return cachedQuery ? self.todosUsuarios.filter(createFilterFor(cachedQuery)) : [];
  }

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(usuario) {
      return (usuario.nome.toLowerCase().indexOf(lowercaseQuery) !== -1);
    };
  }
}

controllersModule.controller('UsuarioSearchController', UsuarioSearchController);

'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function UsuarioSearchController($scope, UsuarioService) {
    var mv = this;
    mv.allUsers = [];
    mv.filterSelected = true;
    var cachedQuery, lastSearch;

    UsuarioService.buscarUsuarioDisponivelParaProjeto(function(usuarios) {
      mv.allUsers = usuarios;
      console.log(usuarios);
    });


    var mock = {
      imagem: ''
    };

    mv.mock = mock;

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(usuario) {
        return (usuario.nome.toLowerCase().indexOf(lowercaseQuery) != -1);
      };
    }

    function querySearch (criteria) {
      cachedQuery = criteria;
      return cachedQuery ? mv.allUsers.filter(createFilterFor(cachedQuery)) : [];
    }

    mv.querySearch = querySearch;
}

controllersModule.controller('UsuarioSearchController', UsuarioSearchController);

'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function UsuarioSearchController($scope, UsuarioService) {
    var self = this;
    self.allUsers = [];
    self.Users = [];
    self.filterSelected = true;
    var cachedQuery, lastSearch;

    UsuarioService.buscarUsuarioDisponivelParaProjeto(function(usuarios) {
      self.allUsers = usuarios;
      console.log(usuarios);
    });


    var mock = {
      imagem: ''
    };

    self.mock = mock;

    function querySearch (criteria) {
      cachedQuery = cachedQuery || criteria;
      return cachedQuery ? self.allUsers.filter(createFilterFor(cachedQuery)) : [];
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact.nome.indexOf(lowercaseQuery) != -1);
      };
    }

    self.querySearch = querySearch;
}

controllersModule.controller('UsuarioSearchController', UsuarioSearchController);

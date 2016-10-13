'use strict';

var factoriesModule = require('./_index');

function systemUri(SystemUriConfig) {
  return {
    login: function() {
      return SystemUriConfig.login;
    },
    home: function () {
      return SystemUriConfig.home;
    },
    funcionalidade: function () {
      return SystemUriConfig.funcionalidade;
    },
    modulo: function () {
      return SystemUriConfig.gestaoProjetoModulo;
    },
    moduloCadastro: function () {
      return SystemUriConfig.gestaoProjetoModuloCadastro;
    },
    moduloAlteracao: function () {
      return SystemUriConfig.gestaoProjetoModuloAlteracao;
    },
    projeto: function () {
      return SystemUriConfig.projeto;
    },
    equipe: function () {
      return SystemUriConfig.equipe;
    },
    projetoCadastro: function () {
      return SystemUriConfig.projetoCadastro;
    },
    projetoAlteracao: function () {
      return SystemUriConfig.projetoAlteracao;
    },
    kanban: function () {
      return SystemUriConfig.gestaoProjetoKanbanModulo;
    },
    notFound: function () {
      return SystemUriConfig.notFound;
    }
  };
}

factoriesModule.factory('systemUri', systemUri);
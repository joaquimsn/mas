'use strict';

var factoriesModule = require('./_index');

function systemUri(SystemUriConfig) {
  return {
    home: function () {
      return SystemUriConfig.home;
    },
    funcionalidade: function () {
      return SystemUriConfig.funcionalidade;
    },
    modulo: function () {
      return SystemUriConfig.modulo;
    },
    moduloCadastro: function () {
      return SystemUriConfig.moduloCadastro;
    },
    moduloAlteracao: function () {
      return SystemUriConfig.moduloAlteracao;
    },
    kanban: function () {
      return SystemUriConfig.kanban;
    },
    notFound: function () {
      return SystemUriConfig.notFound;
    }
  };
}

factoriesModule.factory('systemUri', systemUri);
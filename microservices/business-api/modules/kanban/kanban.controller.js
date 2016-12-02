(function () {
  'use strict';
  var Service = require('./kanban.service');

  function buscarTodos(req, res) {
    Service.buscarTodos(req, res);
  }

  function buscarSecoes(req, res) {
    Service.buscarSecoes(req, res);
  }

  function buscarKanbanPorId(req, res) {
    Service.buscarKanbanPorId(req, res);
  }

  function buscarFuncionalidadesSecao(req, res) {
    Service.buscarFuncionalidadesSecao(req, res);
  }

  function adicionarSecao(req, res) {
    Service.adicionarSecao(req, res);
  }

  function alterarSecao(req, res) {
    Service.alterarSecao(req, res);
  }

  function removerSecao(req, res, next) {
    Service.removerSecao(req, res, next);
  }

  function adicionarFuncionalidadeSecao(req, res) {
    Service.adicionarFuncionalidadeSecao(req, res);
  }

  function removerFuncionalidadeSecao(req, res, next) {
    Service.removerFuncionalidadeSecao(req, res, next);
  }

  function cadastrarKanban(req, res) {
    Service.cadastrarKanban(req, res);
  }

  var controller = {
    buscarTodos: buscarTodos,
    buscarSecoes: buscarSecoes,
    buscarKanbanPorId: buscarKanbanPorId,
    buscarFuncionalidadesSecao: buscarFuncionalidadesSecao,
    adicionarSecao: adicionarSecao,
    alterarSecao: alterarSecao,
    removerSecao: removerSecao,
    adicionarFuncionalidadeSecao: adicionarFuncionalidadeSecao,
    removerFuncionalidadeSecao: removerFuncionalidadeSecao,
    cadastrarKanban: cadastrarKanban
  };

  module.exports = controller;
}());
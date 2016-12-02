(function () {
  'use strict';
  var Service = require('./projeto.service');

  function cadastrar(req, res) {
    Service.cadastrar(req, res);
  }

  function adicionarModulo(req, res) {
    Service.adicionarModulo(req, res);
  }

  function alterar(req, res) {
    Service.alterar(req, res);
  }

  function buscarTodos (req, res) {
    Service.buscarTodos(req, res);
  }

  function buscarPorId (req, res) {
    Service.buscarPorId(req, res);
  }

  function buscarModulos (req, res) {
    Service.buscarModulos(req, res);
  }

  var controller = {
    cadastrar: cadastrar,
    alterar: alterar,
    adicionarModulo: adicionarModulo,
    buscarTodos: buscarTodos,
    buscarPorId: buscarPorId,
    buscarModulos: buscarModulos
  };

  module.exports = controller;
}());
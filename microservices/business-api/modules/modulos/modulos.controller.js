(function () {
  'use strict';
  var Service = require('./modulos.service');

  function cadastrar(req, res) {
    Service.cadastrar(req, res);
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

  function adicionarFuncionalidade (req, res) {
    Service.adicionarFuncionalidade(req, res);
  }

  function adicionarTarefa (req, res) {
    Service.adicionarTarefa(req, res);
  }
  
  function filtrar (req, res) {
    Service.filtrar(req, res);
  }

  var controller = {
    cadastrar: cadastrar,
    alterar: alterar,
    adicionarFuncionalidade: adicionarFuncionalidade,
    adicionarTarefa: adicionarTarefa,
    buscarTodos: buscarTodos,
    buscarPorId: buscarPorId,
    filtrar: filtrar
  };

  module.exports = controller;
}());
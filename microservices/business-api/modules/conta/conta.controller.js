(function () {
  'use strict';
  var Service = require('./conta.service');

  function cadastrar(req, res) {
    Service.cadastrar(req, res);
  }

  function cadastrarConfiguracao(req, res) {
    Service.cadastrarConfiguracao(req, res);
  }

  function alterar(req, res) {
    Service.alterar(req, res);
  }

  function adicionarProjeto(req, res) {
    Service.adicionarProjeto(req, res);
  }

  function adicionarEquipe(req, res) {
    Service.adicionarEquipe(req, res);
  }
 
  function adicionarUsuarioEquipe(req, res) {
    Service.adicionarUsuarioEquipe(req, res);
  }

  function buscarTodos (req, res) {
    Service.buscarTodos(req, res);
  }

  function buscarPorId (req, res) {
    Service.buscarPorId(req, res);
  }

  function buscarProjetos(req, res) {
    Service.buscarProjetos(req, res);
  }
  
  function buscarUsuarioEquipe(req, res) {
    Service.buscarUsuarioEquipe(req, res);
  }
  
  function buscarPorEmail(req, res) {
    Service.buscarPorEmail(req, res);
  }

  function requestToken(req, res) {
    Service.login(req, res);
  }

  var controller = {
    cadastrar: cadastrar,
    cadastrarConfiguracao: cadastrarConfiguracao,
    alterar: alterar,
    adicionarProjeto: adicionarProjeto,
    adicionarEquipe: adicionarEquipe,
    adicionarUsuarioEquipe: adicionarUsuarioEquipe,
    buscarTodos: buscarTodos,
    buscarPorId: buscarPorId,
    buscarProjetos: buscarProjetos,
    buscarUsuarioEquipe: buscarUsuarioEquipe,
    buscarPorEmail: buscarPorEmail,
    requestToken: requestToken
  };

  module.exports = controller;
}());
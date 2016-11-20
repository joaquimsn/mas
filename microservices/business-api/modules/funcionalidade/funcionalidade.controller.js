(function () {
  'use strict';
  var Service = require('./funcionalidade.service');

  function cadastrar(req, res) {
    Service.cadastrar(req, res);
  }

  function  adicionarTarefa(req, res) {
    Service.adicionarTarefa(req, res);
  }

  function  adicionarHistorico(req, res) {
    Service.adicionarHistorico(req, res);
  }

  function  adicionarComentario(req, res) {
    Service.adicionarComentario(req, res);
  }

  function  alterarTarefa(req, res) {
    Service.alterarTarefa(req, res);
  }

  function  alterarComentario(req, res) {
    Service.alterarComentario(req, res);
  }

  function alterar(req, res) {
    Service.alterar(req, res);
  }
  
  function alterarStatus(req, res) {
    Service.alterarStatus(req, res);
  }
  
  function alterarPrioridade(req, res) {
    Service.alterarPrioridade(req, res);
  }

  function removerComentario(req, res) {
    Service.removerComentario(req, res);
  }

  function buscarTodos(req, res) {
    Service.buscarTodos(req, res);
  }

  function buscarTarefas(req, res) {
    Service.buscarTarefas(req, res);
  }

  function buscarHistoricos(req, res) {
    Service.buscarHistoricos(req, res);
  }

  function buscarComentarios(req, res) {
    Service.buscarComentarios(req, res);
  }

  function buscarPorId (req, res) {
    Service.buscarPorId(req, res);
  }
  
  function filtrar (req, res) {
    Service.filtrar(req, res);
  }

  var controller = {
    cadastrar:          cadastrar,
    adicionarTarefa:    adicionarTarefa,
    adicionarHistorico: adicionarHistorico,
    adicionarComentario:adicionarComentario,
    alterarTarefa:      alterarTarefa,
    alterarComentario:  alterarComentario,
    alterar:            alterar,
    alterarStatus:      alterarStatus,
    alterarPrioridade:  alterarPrioridade,
    removerComentario:  removerComentario,
    buscarTodos:        buscarTodos,
    buscarTarefas:      buscarTarefas,
    buscarComentarios:  buscarComentarios,
    buscarHistoricos:   buscarHistoricos,
    buscarPorId:        buscarPorId,
    filtrar: filtrar
  };

  module.exports = controller;
}());
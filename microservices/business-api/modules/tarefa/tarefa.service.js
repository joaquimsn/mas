(function () {
  'use strict';

  var Funcionalidades = require('./tarefa.model');

  function buscarTodos (req, res) {
    var promisse = Funcionalidades.find().exec();

    promisse.then(function (tarefas) {
      res.json(tarefas);
    });

    promisse.then(null, function (error) {
      console.log("Erro ao buscarTodos: " + error)
      res.status(500);
      res.json(error);
    });
  }

  function buscarPorId(req, res) {
    var promisse = Funcionalidades.findOne({'_id' : req.params.id}).exec();

    promisse.then(function (tarefa) {
      res.json(tarefa);
    });
    promisse.then(null, function (error) {
      console.log("Erro ao buscarPorId: " + error)
      res.status(500);
      res.json(error);
    });
  }

  function cadastrar(req, res) {
    var model = new Funcionalidades(req.body);

    var promisse = model.save();

    promisse.then(function(tarefa) {
      res.json(tarefa);
    });

    promisse.then(null, function (error) {
       console.log("Erro ao cadastrar tarefa: " + error)
      res.status(500);
      res.json(error);
    });
  }

  function alterar(req, res) {
    var query = {_id: req.params.id};
    var model = req.body;
    delete model._id;

    var promisse = Funcionalidades.update(query, model);

    promisse.then(function (tarefa) {
      res.json(tarefa);
    });
    promisse.then(null, function (error) {
      console.log("Erro ao alterar o tarefa: " + error);
      res.json(error);
    });
  }

  var service = {
    cadastrar: cadastrar,
    alterar: alterar,
    buscarTodos: buscarTodos,
    buscarPorId: buscarPorId
  };

  module.exports = service;
}());
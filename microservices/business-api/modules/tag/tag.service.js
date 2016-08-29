(function () {
  'use strict';

  var Tag = require('./tag.model');

  function buscarTodos (req, res) {
    var promisse = Tag.find().exec();

    promisse.then(function (tags) {
      res.json(tags);
    });

    promisse.then(null, function (error) {
      console.err("Erro ao buscarTodos: " + error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarPorId(req, res) {
    var promisse = Tag.findOne({'_id' : req.params.id}).exec();

    promisse.then(function (modulo) {
      res.json(modulo);
    });
    promisse.then(null, function (error) {
      console.err("Erro ao buscarPorId: " + error);
      res.status(500);
      res.json(error);
    });
  }

  function cadastrar(req, res) {
    var model = new Tag(req.body);

    var promisse = model.save();

    promisse.then(function(modulo) {
      res.json(modulo);
    });

    promisse.then(null, function (error) {
       console.log("Erro ao cadastrar modulo: " + error);
      res.status(500);
      res.json(error);
    });
  }

  function alterar(req, res) {
    var query = {_id: req.params.id};
    var model = req.body;
    delete model._id;

    var promisse = Tag.update(query, model);

    promisse.then(function (modulo) {
      res.json(modulo);
    });
    promisse.then(null, function (error) {
      console.log("Erro ao alterar o modulo: " + error);
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
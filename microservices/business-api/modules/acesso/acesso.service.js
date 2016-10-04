(function () {
  'use strict';

  var Acesso = require('./acesso.model');

  function buscarTodos (req, res) {
    var promisse = Acesso.find().exec();

    promisse.then(function (acessos) {
      res.json(acessos);
    });

    promisse.then(null, function (error) {
      console.err("Erro ao buscarTodos: ", error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarPorId(req, res) {
    var promisse = Acesso.findOne({'_id' : req.params.idAcesso}).exec();

    promisse.then(function (acesso) {
      res.json(acesso);
    });
    promisse.then(null, function (error) {
      console.err("Erro ao buscarPorId: ", error);
      res.status(500);
      res.json(error);
    });
  }

  function cadastrar(req, res) {
    var model = new Acesso(req.body);

    var promisse = model.save();

    promisse.then(function(acesso) {
      res.json(acesso);
    });

    promisse.then(null, function (error) {
       console.log("Erro ao cadastrar acesso: ", error);
      res.status(500);
      res.json(error);
    });
  }

  function alterar(req, res) {
    var query = {_id: req.params.idAcesso};
    var model = req.body;
    delete model._id;

    var promisse = Acesso.update(query, model);

    promisse.then(function (acesso) {
      res.json(acesso);
    });
    promisse.then(null, function (error) {
      console.log("Erro ao alterar o acesso: ", error);
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
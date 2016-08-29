(function () {
  'use strict';

  var Projeto = require('./projeto.model');

  function buscarTodos (req, res) {
    var promisse = Projeto.find().exec();

    promisse.then(function (projetos) {
      res.json(projetos);
    });

    promisse.then(null, function (error) {
      console.log("Erro ao buscarTodos: " + error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarPorId(req, res) {
    var promisse = Projeto.findOne({'_id' : req.params.id}).exec();

    promisse.then(function (projeto) {
      res.json(projeto);
    });
    promisse.then(null, function (error) {
      console.log("Erro ao buscarPorId: " + error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarModulos(req, res) {
    var promisse = Projeto.find({_id: req.params.idProjeto})
                         .populate('modulos')
                         .exec();

    promisse.then(function (projeto) {
      console.log("consultando modulos");
      res.json(projeto.modulos);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao buscar as secoes do kanaban: " + req.params.idKanban);
      console.error(error);
      res.status(500);
      res.json(error);
    });
  }

  function cadastrar(req, res) {
    var model = new Projeto(req.body);

    var promisse = model.save();

    promisse.then(function(projeto) {
      res.json(projeto);
    });

    promisse.then(null, function (error) {
       console.log("Erro ao cadastrar projeto: " + error);
      res.status(500);
      res.json(error);
    });
  }

  function adicionarModulo(req, res) {
    var promisse = Projeto.findByIdAndUpdate(
    {
      _id: req.params.idProjeto
    }, {
      $push: {modulos: req.body}
    },
    {
      upsert: true,
      safe: true,
      new: true
    }
    ).exec();

    promisse.then(function(projeto) {
      console.log("Modulo adicionado com sucesso");
      var modulos = projeto.modulos.filter(function (value) {
        return value.nome === req.body.nome;
      });
      res.json(modulos[0]);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao adicionarSecao" + error);
      res.status(500);
      res.json(error);
    });
  }

  function alterar(req, res) {
    var query = {_id: req.params.id};
    var model = req.body;
    delete model._id;

    var promisse = Projeto.update(query, model);

    promisse.then(function (projeto) {
      res.json(projeto);
    });
    promisse.then(null, function (error) {
      console.log("Erro ao alterar o projeto: " + error);
      res.json(error);
    });
  }

  var service = {
    cadastrar: cadastrar,
    alterar: alterar,
    adicionarModulo: adicionarModulo,
    buscarTodos: buscarTodos,
    buscarPorId: buscarPorId,
    buscarModulos: buscarModulos
  };

  module.exports = service;
}());
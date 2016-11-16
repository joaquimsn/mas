(function () {
  'use strict';

  var Projeto = require('./projeto.model');
  var KanbanService = require('./../kanban/kanban.service');

  function buscarTodos (req, res) {
    var promisse = Projeto.find().exec();

    promisse.then(function (projetos) {
      res.json(projetos);
    });

    promisse.then(null, function (error) {
      console.log("Projeto Erro ao buscarTodos: ", error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarPorId(req, res) {
    var promisse = Projeto.findOne({'_id' : req.params.idProjeto})
                          .populate('usuarios')
                          .exec();

    promisse.then(function (projeto) {
      res.json(projeto);
    });
    promisse.then(null, function (error) {
      console.log("Projeto Erro ao buscarPorId: ", error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarModulos(req, res) {
    var promisse = Projeto.findById({_id: req.params.idProjeto})
                         .populate('modulos.modulo')
                         .exec();

    promisse.then(function (projeto) {
      console.log("modulos do projeto", projeto);
      res.json(projeto.modulos);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao buscar as modulos do Projeto id:" + req.params.idProjeto, error);
      res.status(500);
      res.json(error);
    });
  }

  function cadastrar(req, res) {
    var projeto = req.body;

    function cadastrarProjetoCb(kanban) {
      projeto.kanban = kanban;
      console.log('Projeto para cadastro', projeto);
      var model = new Projeto(projeto);

      var promisse = model.save();

      promisse.then(function(projeto) {
        res.json(projeto);
      });

      promisse.then(null, function (error) {
        console.log("Erro ao cadastrar projeto: ", error);
        res.status(500);
        res.json(error);
      });
    }

    KanbanService.kanbanDefault(cadastrarProjetoCb);
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
      console.error("Erro ao adicionarModulo idProjeto: " +  req.params.idProjeto, error);
      res.status(500);
      res.json(error);
    });
  }

  function alterar(req, res) {
    var query = {_id: req.params.idProjeto};
    var model = req.body;

    var promisse = Projeto.update(query, {
      $set: {
        nome: model.nome,
        descricao: model.descricao,
        dataInicio: model.dataInicio,
        dataFim: model.dataFim,
        equipes: model.equipes,
        usuarios: model.usuarios
      }
    });

    promisse.then(function (projeto) {
      res.json(projeto);
    });
    promisse.then(null, function (error) {
      console.log("Erro ao alterar o projeto: ", error);
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
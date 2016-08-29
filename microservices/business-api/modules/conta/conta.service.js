(function () {
  'use strict';

  var Conta = require('./conta.usuario.model'),
  bcrypt    = require('bcrypt-nodejs');

  function login (req, res) {
    var username = req.body.usuario,
        password = req.body.senha,
        promisse = Conta.findOne({'email': { $regex : new RegExp(username, "i") }, 'ativo': true}).exec();

    promisse.then(function (conta) {
      if (conta) {
        conta.comparePassword(password, function (err, isMatch) {
          if (isMatch) {
            res.status(200);
            res.json(conta);
          } else {
            res.status(403);
            res.json('Senha inválida');
          }
        });
      } else {
        res.status(403);
        res.json('Usuário inválido');
      }
    });
    promisse.then(null, function (error) {
      console.log(error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarTodos (req, res) {
    var promisse = Conta.find().exec();

    promisse.then(function (contas) {
      res.json(contas);
    });

    promisse.then(null, function (error) {
      console.log("Erro ao buscarTodos: " + error)
      res.status(500);
      res.json(error);
    });
  }

  function buscarPorId(req, res) {
    var promisse = Conta.findOne({'_id' : req.params.id}).exec();

    promisse.then(function (modulo) {
      res.json(modulo);
    });
    promisse.then(null, function (error) {
      console.log("Erro ao buscarPorId: " + error);
      res.status(500);
      res.json(error);
    });
  }

  function cadastrar(req, res) {
    var conta =  req.body;
    conta.senha = bcrypt.hashSync(conta.senha);
    
    var model = new Conta(conta);

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

    var promisse = Conta.update(query, model);

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
    buscarPorId: buscarPorId,
    login: login
  };

  module.exports = service;
}());
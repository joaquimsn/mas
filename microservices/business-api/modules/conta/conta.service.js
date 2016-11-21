(function () {
  'use strict';

  var Conta = require('./conta.usuario.model'),
  mainUtils = require('./../main.utils'),
  bcrypt    = require('bcrypt-nodejs');

  function login (req, res) {
    var username = req.body.usuario.toLowerCase(),
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
            res.json('Usuário ou senha inválidos');
          }
        });
      } else {
        res.status(403);
        res.json('Usuário ou senha inválidos');
      }
    });
    promisse.then(null, function (error) {
      console.log(error);
      res.status(500);
      res.json(error);
    });
  }

  // Quando não existe usuário, é cadastro um novo usando o email
  // informado
  function buscarPorEmail(req, res) {
    var email = req.params.email.toLowerCase();
    var dataAtual = new Date();
    var promise = Conta.find({
                              'email': {$eq: email}
                             }).exec();

    promise.then(function (contas) {
      if(contas.length ===0 ) {
        var novoReq = {};
        novoReq.body = {
          nome: 'Pendente', 
          email: email,
          senha: dataAtual.getMilliseconds()
        };

        console.log("usuario temporario", novoReq.body);

        cadastrar(novoReq, res);
      } else {
        res.json(contas[0]);
      }
    });

    promise.then(null, function (error) {
      console.log("Erro ao buscarPorEmail: ", error);
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
      console.log("Erro ao buscarTodos: ", error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarProjetos(req, res) {
    var promisse = Conta.findById({_id: req.params.idConta})
                         .populate('projetos.projeto')
                         .exec();

    promisse.then(function (conta) {
      console.log("consultando projetos da conta", conta);
      var projetos = conta.projetos;

      if(projetos.length > 0) {
        res.json(projetos);
      } else {
        res.json([]);
      }
    });

    promisse.then(null, function (error) {
      console.error("Erro ao buscar os projetos da conta id: " + req.idConta, error);
      res.status(500);
      res.json(error);
    });
  }

  function vincularProjetoAoUsuario(usuario, projeto) {
    var vinculoProjeto = {
      projeto: projeto,
      vinculo: false
    }; 
    
    var promisse = Conta.update(
    {
      _id: usuario._id
    }, {
      $push: {'projetos': vinculoProjeto}
    },
    {
      upsert: true,
      safe: true
    }
    ).exec();

    promisse.then(function(conta) {
      console.log("Projeto vinculado na conta com sucesso", conta);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao vincularProjetoAoUsuario na conta", error);
    });
  }

  function adicionarProjeto(req, res) {
    var promisse = Conta.update(
    {
      _id: req.params.idConta
    }, {
      $push: {'projetos': req.body}
    },
    {
      upsert: true,
      safe: true,
      new:true
    }
    ).exec();

    promisse.then(function(conta) {
      console.log("Projeto adicionado na conta com sucesso", conta);
      res.json(conta);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao adicionarProjeto na conta", error);
      res.status(500);
      res.json(error);
    });
  }

  function adicionarEquipe(req, res) {
    var promisse = Conta.update(
    {
      _id: req.params.idConta
    }, {
      $push: {'equipes': req.body}
    },
    {
      upsert: true,
      safe: true,
      new:true
    }
    ).exec();

    promisse.then(function(conta) {
      console.log("Equipe adicionado na conta com sucesso", conta);
      res.json(conta);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao adicionarEquipe na conta", error);
      res.status(500);
      res.json(error);
    });
  }

  function adicionarUsuarioEquipe(req, res) {
    var promisse = Conta.update(
    {
      _id: req.params.idConta,
      'equipes._id': req.params.idEquipe
    }, {
      $push: {'equipes.$.membros': req.body}
    },
    {
      safe: true
    }
    ).exec();

    promisse.then(function(conta) {
      console.log("Usuario adicionada na equipe com sucesso");
      res.json(conta);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao adicionarUsuarioEquipe", error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarUsuariosPorIds(ids, res) {
    var promisse = Conta.find({_id: {'$in' : ids}})
                         .exec();

    promisse.then(function (usuarios) {
      res.json(usuarios);
    });
    promisse.then(null, function (error) {
      console.log("Erro ao buscarUsuarios por id: ", error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarUsuarioEquipe(req, res) {
    var promisse = Conta.findById({_id: req.params.idConta, 'equipes._id': req.idEquipe})
                         .exec();

    promisse.then(function (conta) {
      console.log("consultando membros da equipe");
      var equipes = conta.equipes.filter(function (equipe) {
        return String(equipe._id) === req.params.idEquipe;
      });

      if(equipes.length > 0) {
        var ids = mainUtils.extrairIds(equipes[0].membros);

        buscarUsuariosPorIds(ids, res);
      } else {
        res.json([]);
      }
    });

    promisse.then(null, function (error) {
      console.error("Erro ao buscar o conta por nome: ", req.params.nome);
    
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
      console.log("Erro ao buscarPorId: ", error);
      res.status(500);
      res.json(error);
    });
  }

  function cadastrar(req, res) {
    var conta =  req.body;
    conta.senha = bcrypt.hashSync(conta.senha);
    conta.email = conta.email.toLowerCase();
    var model = new Conta(conta);

    var promisse = model.save();

    promisse.then(function(conta) {
      console.log('Conta cadastrada', conta);
      res.json(conta);
    });

    promisse.then(null, function (error) {
       console.log("Erro ao cadastrar conta: ", error);
      res.status(500);
      res.json(error);
    });
  }

  function alterar(req, res) {
    var query = {_id: req.params.idConta};
    var conta = req.body;
    conta.senha = bcrypt.hashSync(conta.senha);

    var promisse = Conta.update(query, {
      $set: {senha: conta.senha, 
            nome: conta.nome}
      });

    promisse.then(function (conta) {
      res.json(conta);
    });
    promisse.then(null, function (error) {
      console.log("Erro ao alterar o conta: ", error);
      res.json(error);
    });
  }

  var service = {
    cadastrar: cadastrar,
    alterar: alterar,
    vincularProjetoAoUsuario: vincularProjetoAoUsuario,
    adicionarProjeto: adicionarProjeto,
    adicionarEquipe: adicionarEquipe,
    adicionarUsuarioEquipe: adicionarUsuarioEquipe,
    buscarTodos: buscarTodos,
    buscarPorId: buscarPorId,
    buscarProjetos: buscarProjetos,
    buscarUsuarioEquipe: buscarUsuarioEquipe,
    buscarPorEmail: buscarPorEmail,
    login: login
  };

  module.exports = service;
}());
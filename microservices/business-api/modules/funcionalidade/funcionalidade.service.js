(function () {
  'use strict';

  var Funcionalidades = require('./funcionalidade.model');

  function buscarTodos (req, res) {
    var promisse = Funcionalidades.find().exec();

    promisse.then(function (funcionalidades) {
      res.json(funcionalidades);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao buscarTodos: " + error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarTarefas(req, res) {
    var promisse = Funcionalidades.findById({_id: req.params.idFuncionalidade}).exec();

    promisse.then(function (funcionalidade) {
      console.log("consultando tarefas");
      res.json(funcionalidade.tarefas);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao buscar as tarefas da funcionalidade: " + req.params.idFuncionalidade);
      console.error(error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarHistoricos(req, res) {
    var promisse = Funcionalidades.findById({_id: req.params.idFuncionalidade}).exec();

    promisse.then(function (funcionalidade) {
      console.log("consultando historicos", funcionalidade.historicos);
      res.json(funcionalidade.historicos);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao buscar os historicos da funcionalidade: " + req.params.idFuncionalidade);
      console.error(error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarComentarios(req, res) {
    var promisse = Funcionalidades.findById({_id: req.params.idFuncionalidade})
                                  .populate('usuarios')
                                  .populate('tarefas.tarefa')
                                  .populate('tarefas.comentarios')
                                  .exec();

    promisse.then(function (funcionalidade) {
      console.log("consultando comentarios");
      res.json(funcionalidade.comentarios);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao buscar os comentarios da funcionalidade: " + req.params.idFuncionalidade);
      console.error(error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarPorId(req, res) {
    var promisse = Funcionalidades.findOne({'_id' : req.params.idFuncionalidade})
                                  .populate('tags')
                                  .exec();

    promisse.then(function (funcionalidade) {
      res.json(funcionalidade);
    });
    promisse.then(null, function (error) {
      console.error("Erro ao buscarPorId: " + error);
      res.status(500);
      res.json(error);
    });
  }

  function cadastrar(req, res) {
    var model = new Funcionalidades(req.body);

    var promisse = model.save();

    promisse.then(function(funcionalidade) {
      res.json(funcionalidade);
    });

    promisse.then(null, function (error) {
       console.error("Erro ao cadastrar funcionalidade: " + error);
      res.status(500);
      res.json(error);
    });
  }
  
  function adicionarHistorico(req, res) {
    var promisse = Funcionalidades.findByIdAndUpdate(
    {
      _id: req.params.idFuncionalidade
    }, {
      $push: {'historicos': req.body}
    },
    {
      safe: true,
      new: true
    }
    ).exec();

    promisse.then(function(funcionalidade) {
      console.log("Historico adicionado com sucesso", funcionalidade.historicos);
      res.json(funcionalidade.historicos);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao adicionarHistorico", error);
      res.status(500);
      res.json(error);
    });
  }

  function adicionarComentario(req, res) {
    var promisse = Funcionalidades.findByIdAndUpdate(
    {
      _id: req.params.idFuncionalidade
    }, {
      $push: {comentarios: req.body}
    },
    {
      upsert: true,
      safe: true
    }
    ).exec();

    promisse.then(function(funcionalidade) {
      console.log("Comentario adicionado com sucesso");
      res.json(funcionalidade);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao adicionarComentario" + error);
      res.status(500);
      res.json(error);
    });
  }

  function adicionarTarefa(req, res) {
    console.log("tarefa", req.body);
    var promisse = Funcionalidades.findByIdAndUpdate(
    {
      _id: req.params.idFuncionalidade
    }, {
      $push: {tarefas:  req.body}
    },
    {
      safe: true,
      new: true
    }
    ).exec();

    promisse.then(function(funcionalidade) {
      console.log("Tarefa adicionada com sucesso");
      res.json(funcionalidade.tarefas);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao adicionarTarefa" + error);
      res.status(500);
      res.json(error);
    });
  }

  function alterarTarefa(req, res) {
    var promisse = Funcionalidades.update(
    {
      _id: req.params.idFuncionalidade,
      'tarefas.tarefa._id': req.params.idTarefa
    }, {
      $set: {'tarefas.$': req.body}
    },
    {
      safe: true
    }
    ).exec();

    promisse.then(function (funcionalidade) {
      res.json(funcionalidade);
    });
    promisse.then(null, function (error) {
      console.error("Erro ao alterar a tarefa: " + error);
      res.status(500);
      res.json(error);
    });
  }

  function alterarComentario(req, res) {
    var promisse = Funcionalidades.update(
    {
      _id: req.params.idFuncionalidade,
      'comentarios._id': req.params.idComentario
    }, {
      $set: {'comentarios.$': req.body}
    },
    {
      safe: true
    }
    ).exec();

    promisse.then(function (funcionalidade) {
      res.json(funcionalidade);
    });
    promisse.then(null, function (error) {
      console.error("Erro ao alterar o comentario: " + error);
      res.status(500);
      res.json(error);
    });
  }

  function alterar(req, res) {
    var query = {_id: req.params.idFuncionalidade};
    var model = req.body;
  
    var promisse = Funcionalidades.update(query, {
      $set: {titulo: model.titulo, 
            descricao: model.descricao,   
            tags: model.tags, 
            dataInicio: model.dataInicio,
            dataFim: model.dataFim,
            usuarios: model.usuarios,
            severidade: model.severidade}
    });

    promisse.then(function (funcionalidade) {
      res.json(funcionalidade);
    });
    promisse.then(null, function (error) {
      console.error("Erro ao alterar o funcionalidade: " + error);
      res.status(500);
      res.json(error);
    });
  }

  function removerComentario(req, res) {
    var promisse = Funcionalidades.findByIdAndUpdate(
    {
      _id: req.params.idFuncionalidade
    }, {
      $pull: {comentarios: {_id: req.params.idComentario}}
    },
    {
      safe: true
    }
    ).exec();

    promisse.then(function () {
      console.log("Removendo comentario: " + req.params.idComentario);
      res.send(204);
    });
    promisse.then(null, function (error) {
      console.error("Erro ao remover o comentario: " + error);
      res.status(500);
      res.json(error);
    });
  }

  var service = {
    cadastrar: cadastrar,
    adicionarTarefa: adicionarTarefa,
    adicionarHistorico: adicionarHistorico,
    adicionarComentario: adicionarComentario,
    alterarTarefa: alterarTarefa,
    alterarComentario: alterarComentario,
    alterar: alterar,
    removerComentario: removerComentario,
    buscarTodos: buscarTodos,
    buscarTarefas: buscarTarefas,
    buscarHistoricos: buscarHistoricos,
    buscarComentarios: buscarComentarios,
    buscarPorId: buscarPorId
  };

  module.exports = service;
}());
(function () {
  'use strict';
  var Kanban    = require('./kanban.model');
  var kanbanUtil = require('./kanban.util');

  function KanbanObject() {
    return {
      nome: 'default',
      quantidadeSecoes:   2,
      secoes: [
        {
          nome: 'ToDo',
          ordem: 0
        },
        {
          nome: 'Done',
          ordem:            1,
          estadoFinal:      true
        }
      ]
    };
  }

  function cadastrarKanbanDefault(callback) {
    var model = new Kanban(new KanbanObject());

    var promisse = model.save();

    promisse.then(function(kanban) {
     callback(kanban);
    });

    promisse.then(null, function (error) {
      console.log("Falha ao cadastrar o kanban Default", error);
    });
  }

  function cadastrarKanban(req, res) {
    var model = new Kanban(req.body);

    var promisse = model.save();

    promisse.then(function(section) {
      res.json(section);
    });

    promisse.then(null, function (error) {
      console.log("Falha ao cadastrar o kanban", error);
      res.status(500);
      res.json(error);
    });
  }

  function adicionarSecao(req, res) {
    var promisse = Kanban.findByIdAndUpdate(
    {
      _id: req.params.idKanban
    }, {
      $push: {secoes: req.body}
    },
    {
      upsert: true,
      safe: true,
      new: true
    }
    ).exec();

    promisse.then(function(kanban) {
      console.log("Seção adicionada com sucesso");
      var secoes = kanban.secoes.filter(function (value) {
        return value.nome === req.body.nome;
      });
      res.json(secoes[0]);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao adicionarSecao", error);
      res.status(500);
      res.json(error);
    });
  }

  /*Ajustar: Esse código sobrescrevendo todo o objeto, então é possivel
  * garantir a consistencia das funcionalidade. solução atualizar somentes os campos alterados
  * */
  function alterarSecao(req, res) {
    var promisse = Kanban.update(
    {
      _id: req.params.idKanban,
      'secoes._id': req.params.idSecao
    }, {
      $set: {'secoes.$': req.body}
    },
    {
      safe: true
    }
    ).exec();

    promisse.then(function (kanban) {
      res.json(kanban);
    });
    promisse.then(null, function (error) {
      console.error("Erro ao alterar a secao: ", error);
      res.json(error);
    });
  }

  function removerSecao(req, res, next) {
    var promisse = Kanban.findByIdAndUpdate(
    {
      _id: req.params.idKanban
    }, {
      $pull: {secoes: {_id: req.params.idSecao}}
    }
    ).exec();

    promisse.then(function() {
      console.log("Seção removida com sucesso");
      res.send(204);
      next();
    });

    promisse.then(null, function (error) {
      console.error("Erro ao removerSecao", error);
      res.status(500);
      res.json(error);
    });
  }

  function adicionarFuncionalidadeSecao(req, res) {
    var promisse = Kanban.update(
    {
      _id: req.params.idKanban,
      'secoes._id': req.params.idSecao
    }, {
      $push: {'secoes.$.funcionalidades': req.body}
    },
    {
      upsert: true,
      safe: true
    }
    ).exec();

    promisse.then(function(kanban) {
      console.log("Funcionalidade adicionada na secao com sucesso");
      res.json(kanban);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao adicionarFuncionalidadeSecao", error);
      res.status(500);
      res.json(error);
    });
  }

  function removerFuncionalidadeSecao(req, res, next) {
    var promisse = Kanban.update(
    {
      _id: req.params.idKanban,
      'secoes._id': req.params.idSecao
    }, {
      $pull: {'secoes.$.funcionalidades': req.params.idFuncionalidade}
    },
    {
      safe: true
    }
    ).exec();

    promisse.then(function() {
      console.log("Funcionalidade removida da secao com sucesso");
      res.send(204);
      next();
    });

    promisse.then(null, function (error) {
      console.error("Erro ao removerFuncionalidadeSecao", error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarTodos(req, res) {
    var promisse = Kanban.find()
                         .populate('secoes.funcionalidades')
                         .exec();

    promisse.then(function (kanban) {
      res.json(kanban);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao buscarTodos: ", error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarSecoes(req, res) {
    var promisse = Kanban.find({_id: req.params.idKanban})
                         .populate('secoes.funcionalidades')
                         .exec();

    promisse.then(function (kanban) {
      console.log("consultando secoes");
      res.json(kanban.secoes);
    });

    promisse.then(null, function (error) {
      console.error("Erro ao buscar as secoes do kanban: " + req.params.idKanban);
      console.error(error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarKanbanPorNome(req, res) {
    var promisse = Kanban.find({nome: {$eq: req.params.nome}})
                         .populate('secoes.funcionalidades')
                         .exec();

    promisse.then(function (kanban) {
      console.log("consultando kanban");

      if(kanban.length > 0) {
        for (var index = 0; index < kanban[0].secoes.length; index++) {
          var secao = kanban[0].secoes[index];
          kanban[0].secoes[index].funcionalidades = secao.funcionalidades.sort(kanbanUtil.compararOrdem); 
        }
        res.json(kanban[0]);
      } else {
        res.json('[]');
      }
    });

    promisse.then(null, function (error) {
      console.error("Erro ao buscar o kanban por nome: " + req.params.nome);
      console.error(error);
      res.status(500);
      res.json(error);
    });
  }

  function buscarFuncionalidadesSecao(req, res) {
    var promisse = Kanban.findById({_id: req.params.idKanban})
                         .populate('secoes.funcionalidades')
                         .exec();

    promisse.then(function (kanban) {
      console.log("consultando funcionalidades da secao");
      var secoes = kanban.secoes.filter(function (secao) {
        return String(secao._id) === req.params.idSecao;
      });

      if(secoes.length > 0) {
        res.json(secoes[0].funcionalidades);
      } else {
        res.json('[]');
      }
    });

    promisse.then(null, function (error) {
      console.error("Erro ao buscar o kanban por nome: " + req.params.nome);
      console.error(error);
      res.status(500);
      res.json(error);
    });
  }

  var service = {
    kanbanDefault: cadastrarKanbanDefault,
    buscarTodos: buscarTodos,
    buscarSecoes: buscarSecoes,
    buscarKanbanPorNome: buscarKanbanPorNome,
    buscarFuncionalidadesSecao: buscarFuncionalidadesSecao,
    adicionarSecao: adicionarSecao,
    alterarSecao: alterarSecao,
    removerSecao: removerSecao,
    adicionarFuncionalidadeSecao: adicionarFuncionalidadeSecao,
    removerFuncionalidadeSecao: removerFuncionalidadeSecao,
    cadastrarKanban: cadastrarKanban
  };

  module.exports = service;
}());
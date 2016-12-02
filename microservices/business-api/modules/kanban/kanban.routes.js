module.exports = function (server) {
  'use strict';
  var controller = require('./kanban.controller');

  /*Listagens*/
  server.get('/kanban', controller.buscarTodos);
  server.get('/kanban/:idKanban', controller.buscarKanbanPorId);
  server.get('/kanban/:idKanban/secoes', controller.buscarSecoes);
  server.get('/kanban/:idKanban/secoes/:idSecao/funcionalidades', controller.buscarFuncionalidadesSecao);

  /*Cadastros*/
  server.post('/kanban', controller.cadastrarKanban);
  server.post('/kanban/:idKanban/secoes', controller.adicionarSecao);
  server.post('/kanban/:idKanban/secoes/:idSecao/funcionalidades', controller.adicionarFuncionalidadeSecao);

  /*Alterações*/
  server.put('/kanban/:idKanban/secoes/:idSecao', controller.alterarSecao);

  /*Exclusões*/
  server.del('/kanban/:idKanban/secoes/:idSecao', controller.removerSecao);
  server.del('/kanban/:idKanban/secoes/:idSecao/funcionalidades/:idFuncionalidade', controller.removerFuncionalidadeSecao);
};
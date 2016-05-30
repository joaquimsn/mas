module.exports = function (server) {
  'use strict';
  var controller = require('./tarefa.controller');

  server.get('/tarefas', controller.buscarTodos);
  server.get('/tarefas/:id', controller.buscarPorId);

  server.post('/tarefas', controller.cadastrar);
  server.put('/tarefas/:id', controller.alterar);
};
module.exports = function (server) {
  'use strict';
  var controller = require('./conta.controller');

  server.get('/contas', controller.buscarTodos);
  server.get('/contas/:id', controller.buscarPorId);

  server.post('/contas', controller.cadastrar);
  server.put('/contas/:idConta', controller.alterar);

  server.put('/contas/:idConta/projetos', controller.adicionarProjeto);

  server.post('/contas/autorizacao', controller.requestToken);
};
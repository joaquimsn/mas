module.exports = function (server) {
  'use strict';
  var controller = require('./tag.controller');

  server.get('/tags', controller.buscarTodos);
  server.get('/tags/:id', controller.buscarPorId);

  server.post('/tags', controller.cadastrar);
  server.put('/tags/:id', controller.alterar);
};
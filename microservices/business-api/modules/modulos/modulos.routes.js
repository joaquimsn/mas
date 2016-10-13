module.exports = function (server) {
  'use strict';
  var controller = require('./modulos.controller');

  server.get('/modulos', controller.buscarTodos);
  server.get('/modulos/:id', controller.buscarPorId);

  server.post('/modulos', controller.cadastrar);
  server.put('/modulos/:id', controller.alterar);

  server.put('/modulos/:idModulo/funcionalidades', controller.adicionarFuncionalidade);
};
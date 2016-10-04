module.exports = function (server) {
  'use strict';
  var controller = require('./acesso.controller');

  server.get('/acessos', controller.buscarTodos);
  server.get('/acessos/:idAcesso', controller.buscarPorId);

  server.post('/acessos', controller.cadastrar);
  server.put('/acessos/:idAcesso', controller.alterar);
};
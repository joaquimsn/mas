module.exports = function (server) {
  'use strict';
  var controller = require('./projeto.controller');

  server.get('/projetos', controller.buscarTodos);
  server.get('/projetos/:idProjeto', controller.buscarPorId);
  server.get('/projetos/:idProjeto/modulos', controller.buscarModulos);

  server.post('/projetos', controller.cadastrar);
  server.post('/projetos/:idProjeto/modulos', controller.adicionarModulo);

  server.put('/projetos/:idProjeto', controller.alterar);
  server.del('/projetos/:idProjeto/modulos/:idModulo', controller.removerModulo);
};
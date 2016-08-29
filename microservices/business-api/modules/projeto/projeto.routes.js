module.exports = function (server) {
  'use strict';
  var controller = require('./projeto.controller');

  server.get('/projetos', controller.buscarTodos);
  server.get('/projetos/:id', controller.buscarPorId);
  server.get('/projeto/:idProjeto/modulos', controller.buscarModulos);

  server.post('/projetos', controller.cadastrar);
  server.post('/projetos/:idProjeto/modulos', controller.adicionarModulo);

  server.put('/projetos/:id', controller.alterar);
};
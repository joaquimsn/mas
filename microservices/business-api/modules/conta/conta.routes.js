module.exports = function (server) {
  'use strict';
  var controller = require('./conta.controller');

  server.get('/contas', controller.buscarTodos);
  server.get('/contas/email/:email', controller.buscarPorEmail);
  server.get('/contas/:id', controller.buscarPorId);
  server.get('/contas/:idConta/projetos', controller.buscarProjetos);
  server.get('/contas/:idConta/equipes/:idEquipe/membros', controller.buscarUsuarioEquipe);

  server.post('/contas', controller.cadastrar);
  
  server.put('/contas/:idConta', controller.alterar);
  server.put('/contas/:idConta/projetos', controller.adicionarProjeto);
  server.put('/contas/:idConta/equipes', controller.adicionarEquipe);
  server.put('/contas/:idConta/equipes/:idEquipe/membros', controller.adicionarUsuarioEquipe);
  server.put('/contas/:idConta/configuracoes', controller.cadastrarConfiguracao);


  server.post('/contas/autorizacao', controller.requestToken);
};
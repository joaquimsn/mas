module.exports = function (server) {
  'use strict';
  var controller = require('./funcionalidade.controller');

  /*Listagens*/
  server.get('/funcionalidades', controller.buscarTodos);
  server.get('/funcionalidades/:idFuncionalidade', controller.buscarPorId);
  server.get('/funcionalidades/:idFuncionalidade/tarefas', controller.buscarTarefas);
  server.get('/funcionalidades/:idFuncionalidade/historicos', controller.buscarHistoricos);
  server.get('/funcionalidades/:idFuncionalidade/comentarios', controller.buscarComentarios);

  /*Cadastros*/
  server.post('/funcionalidades', controller.cadastrar);
  server.post('/funcionalidades/:idFuncionalidade/tarefas', controller.adicionarTarefa);
  server.post('/funcionalidades/:idFuncionalidade/historicos', controller.adicionarHistorico);
  server.post('/funcionalidades/:idFuncionalidade/comentarios', controller.adicionarComentario);

  /*Alterações*/
  server.put('/funcionalidades/:idFuncionalidade', controller.alterar);
  server.put('/funcionalidades/:idFuncionalidade/tarefas/:idTarefa', controller.alterarTarefa);
  server.put('/funcionalidades/:idFuncionalidade/comentarios/:idComentario', controller.alterarComentario);
  server.put('/funcionalidades/:idFuncionalidade/status', controller.alterarStatus);
  server.put('/funcionalidades/:idFuncionalidade/prioridade', controller.alterarPrioridade);

  /*Exclusões*/
  server.del('/funcionalidades/:idFuncionalidade/comentarios/:idComentario', controller.removerComentario);
  
  // Filtro
  server.post('/funcionalidades/filtro', controller.filtrar);
};
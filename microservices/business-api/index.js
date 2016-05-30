(function() {
  "use strict";

  var restify   = require('restify'),
      config    = require('./config/config')();

  require('./config/mongodb.connection')();

  var server    = restify.createServer({
    name: 'tg-api',
    version: '1.0.0'
  });

  restify.CORS.ALLOW_HEADERS.push('authorization');
  server.use(restify.CORS());
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  server.use(restify.dateParser());
  server.use(restify.gzipResponse());

  require('./modules/kanban/kanban.routes')(server);
  require('./modules/modulos/modulos.routes')(server);
  require('./modules/funcionalidade/funcionalidade.routes')(server);
  require('./modules/tarefa/tarefa.routes')(server);

  server.listen(config.port, function () {
    console.log('api server '+ config.address + ' (' + config.env + ') escutando na porta ' + config.port);
  });

}());
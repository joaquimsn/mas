(function() {
  "use strict";

  var restify   = require('restify'),
      config    = require('./config/config')();

  require('./config/mongodb.connection')();

  var server    = restify.createServer({
    name: 'tg-api',
    version: '1.0.0'
  });

  // restify.CORS({
  //   origins: [
  //     'http://localhost:3000',
  //     'http://localhost:3002'
  //   ],
  //   headers: [
  //     "authorization",
  //     "withcredentials",
  //     "x-requested-with",
  //     "x-forwarded-for",
  //     "x-real-ip",
  //     "x-customheader",
  //     "user-agent",
  //     "keep-alive",
  //     "host",
  //     "accept",
  //     "connection",
  //     "upgrade",
  //     "content-type",
  //     "dnt",
  //     "if-modified-since",
  //     "cache-control"
  //   ]
  // });
  restify.CORS.ALLOW_HEADERS.push('authorization');
  // restify.CORS.ALLOW_HEADERS.push('Accept-Encoding');
  // restify.CORS.ALLOW_HEADERS.push('Accept-Language');
  server.use(restify.CORS());
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  server.use(restify.dateParser());
  server.use(restify.gzipResponse());

  require('./modules/conta/conta.routes')(server);
  require('./modules/kanban/kanban.routes')(server);
  require('./modules/modulos/modulos.routes')(server);
  require('./modules/funcionalidade/funcionalidade.routes')(server);
  require('./modules/tarefa/tarefa.routes')(server);
  require('./modules/tag/tag.routes')(server);
  require('./modules/projeto/projeto.routes')(server);

  server.listen(config.port, function () {
    console.log('api server '+ config.address + ' (' + config.env + ') escutando na porta ' + config.port);
  });

  server.on("MethodNotAllowed", function (request, response) {
    if (request.method.toUpperCase() === "OPTIONS") {
      response.header("Access-Control-Allow-Credentials", true);
      response.header("Access-Control-Allow-Headers", restify.CORS.ALLOW_HEADERS.join(", "));
      response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      response.header("Access-Control-Allow-Origin", request.headers.origin);
      response.header("Access-Control-Max-Age", 0);
      response.header("Content-type", "text/plain charset=UTF-8");
      response.header("Content-length", 0);

      response.send(204);
    }
    else {
      response.send(new restify.MethodNotAllowedError());
    }
  });

}());
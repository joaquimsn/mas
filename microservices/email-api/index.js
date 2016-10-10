(function () {
  "use strict";

  var restify   = require('restify'),
      config    = require('./config/config')();

  var server    = restify.createServer({
    name: 'email-api',
    version: '1.0.0'
  });

  restify.CORS.ALLOW_HEADERS.push('authorization');
  server.use(restify.CORS());
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  server.use(restify.dateParser());
  server.use(restify.gzipResponse());

  require('./modules/email/email.routes')(server);

  server.listen(config.port, function () {
    console.log('email-api server '+ config.address + ' (' + config.env + ') escutando na porta ' + config.port);
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
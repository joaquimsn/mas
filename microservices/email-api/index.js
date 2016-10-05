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
}());
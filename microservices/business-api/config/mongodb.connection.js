module.exports = function () {
  "use strict";

  var mongoose =    require('mongoose'),
      config   = require('./config')(),
      db;

  mongoose.connect(config.db);

  db = mongoose.connection;

  db.on('error',function(err){
    console.log('Durante a conexão ocooreu o seguinte erro ', err);
  });

  db.on('open',function(){
    console.log('Conexão aberta');
  });

  db.on('connected',function(){
    console.log('Estamos conectados');
  });

  db.on('disconnect',function(err){
    console.log('Você foi desconectado', err);
  });

  db.on('disconnect',function(err){
    console.log('Você foi desconectado', err);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Sua aplicação foi encerrada e desconectada');
      process.exit(0);
    });
  });
};

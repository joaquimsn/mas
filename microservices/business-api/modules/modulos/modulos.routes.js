module.exports = function (server) {
  'use strict';
  var controller = require('./modulos.controller');

  server.get('/modulos', controller.findAll);
};
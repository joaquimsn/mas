module.exports = function (server) {
  'use strict';

  var controller = require('./email.controller');

  server.post('/email', controller.sendEmail);
};
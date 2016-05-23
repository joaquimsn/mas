module.exports = function (server) {
  'use strict';
  var controller = require('./kanban.controller');

  server.get('/kanban', controller.find);
  /*server.get('/kanban/sections', controller.findSections);*/

  server.post('/kanban/section', controller.saveSection);
};
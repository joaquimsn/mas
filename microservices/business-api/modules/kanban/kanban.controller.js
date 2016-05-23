(function () {
  'use strict';
  var Service = require('./kanban.service');

  function find(req, res) {
    Service.find(req, res);
  }

  function saveSection(req, res) {
    Service.saveSection(req, res);
  }

  var controller = {
    find: find,
    saveSection: saveSection
  };

  module.exports = controller;
}());
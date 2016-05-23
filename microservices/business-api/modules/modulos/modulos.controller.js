(function () {
  'use strict';
  var Service = require('./modulos.service');

  function findAll (req, res) {
    Service.findAll(req, res);
  }

  var controller = {
    findAll: findAll
  };

  module.exports = controller;
}());
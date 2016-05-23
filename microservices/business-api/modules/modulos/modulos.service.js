(function () {
  'use strict';

  var model = require('./modulos.model');

  function findAll (req, res) {
    res.json(require('./modulos.mock.js', {'content-type': 'application/json; charset=utf-8'}));
  }

  var service = {
    findAll: findAll
  };

  module.exports = service;
}());
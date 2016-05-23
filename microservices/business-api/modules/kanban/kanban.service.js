(function () {
  'use strict';
  var Kanban    = require('./kanban.model');

  function saveSection(req, res) {
    var model = new Course(req.body);

    var promisse = model.save();

    promisse.then(function(section) {
      res.json(section);
    });

    promisse.then(null, function (error) {
      console.log(error);
      res.status(500);
      res.json(error);
    });
  }

  function find(req, res) {
    var kanban = require('./kanban.mock')[0];

    res.json(kanban);
  }

  var service = {
    find: find
  };

  module.exports = service;
}());
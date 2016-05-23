'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var kanbanModule = [
  'agileTcc.Kanban.controllers',
  'agileTcc.Kanban.services',
  'agileTcc.Kanban.factories'
];

module.exports = angular.module('agileTcc.Kanban', kanbanModule);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
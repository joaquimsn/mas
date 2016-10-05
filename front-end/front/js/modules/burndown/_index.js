'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var burndownModule = [
  'agileTcc.Burndown.controllers',
  'agileTcc.Burndown.directives',
  'agileTcc.Burndown.services'
];

module.exports = angular.module('agileTcc.Burndown', burndownModule);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
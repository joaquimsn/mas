'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var equipeModule = [
  'agileTcc.Equipe.controllers',
  'agileTcc.Equipe.services'
];

module.exports = angular.module('agileTcc.Equipe', equipeModule);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var homeModule = [
  'agileTcc.Home.controllers',
  'agileTcc.Home.services'
];

module.exports = angular.module('agileTcc.Home', homeModule);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
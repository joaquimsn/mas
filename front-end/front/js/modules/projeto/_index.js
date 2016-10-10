'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var moduloModule = [
  'agileTcc.Modulo.controllers',
  'agileTcc.Modulo.services'
];

module.exports = angular.module('agileTcc.Modulo', moduloModule);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
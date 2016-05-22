'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var coursesModule = [
  'agileTcc.Modulo.controllers',
  'agileTcc.Modulo.directives',
  'agileTcc.Modulo.services'
];

module.exports = angular.module('agileTcc.Modulo', coursesModule);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
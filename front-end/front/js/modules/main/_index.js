'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var mainModule = [
  'agileTcc.Main.controllers',
  'agileTcc.Main.services',
  'agileTcc.Main.directives',
  'agileTcc.Main.factories'
];

module.exports = angular.module('agileTcc.Main', mainModule);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
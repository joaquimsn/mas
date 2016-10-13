'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var tagModule = [
  'agileTcc.Tag.controllers',
  'agileTcc.Tag.services'
];

module.exports = angular.module('agileTcc.Tag', tagModule);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
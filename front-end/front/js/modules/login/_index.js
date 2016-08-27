'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var loginModule = [
  'agileTcc.Login.controllers',
  'agileTcc.Login.services'
];

module.exports = angular.module('agileTcc.Login', loginModule);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var emailModules = [
  'agileTcc.Email.services',
  'agileTcc.Email.factories'
];

module.exports = angular.module('agileTcc.Email', emailModules);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var dashboardModule = [
  'agileTcc.Dashboard.controllers',
  'agileTcc.Dashboard.directives',
  'agileTcc.Dashboard.services'
];

module.exports = angular.module('agileTcc.Dashboard', dashboardModule);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
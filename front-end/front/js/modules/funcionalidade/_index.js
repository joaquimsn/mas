'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var funcionalidadeModule = [
  'agileTcc.Funcionalidade.controllers',
  'agileTcc.Funcionalidade.services'
];

module.exports = angular.module('agileTcc.Funcionalidade', funcionalidadeModule);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
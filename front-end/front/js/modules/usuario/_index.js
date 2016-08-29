'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var usuarioModule = [
  'agileTcc.Usuario.controllers',
  'agileTcc.Usuario.services'
];

module.exports = angular.module('agileTcc.Usuario', usuarioModule);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
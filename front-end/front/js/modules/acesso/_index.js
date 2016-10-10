'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var acessoModule = [
  'agileTcc.Acesso.controllers',
  'agileTcc.Acesso.services'
];

module.exports = angular.module('agileTcc.Acesso', acessoModule);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
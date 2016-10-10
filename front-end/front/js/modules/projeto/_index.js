'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var projetoModule = [
  'agileTcc.Projeto.controllers',
  'agileTcc.Projeto.services'
];

module.exports = angular.module('agileTcc.Projeto', projetoModule);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
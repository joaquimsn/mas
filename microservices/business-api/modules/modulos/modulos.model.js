'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    moduloSchema = require('./modulos.schema');

var ModulosSchema = new Schema(moduloSchema);

module.exports = mongoose.model('Modulos', ModulosSchema);
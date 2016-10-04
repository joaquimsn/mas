'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    acessoSchema = require('./acesso.schema');

var Acessos = new Schema(acessoSchema);

module.exports = mongoose.model('Acessos', Acessos);
'use strict';

var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    funcionalidadeSchema    = require('./funcionalidade.schema');

var FuncionalidadeSchema = new Schema(funcionalidadeSchema);

module.exports = mongoose.model('Funcionalidades', FuncionalidadeSchema);
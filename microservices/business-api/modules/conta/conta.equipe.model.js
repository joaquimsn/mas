'use strict';
var mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    equipeSchema   = require('./conta.equipe.schema');

var EquipeSchema = new Schema(equipeSchema);

module.exports = mongoose.model('Equipes', EquipeSchema);
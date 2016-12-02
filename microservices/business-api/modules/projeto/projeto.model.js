'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    projetoSchema = require('./projeto.schema');

var ProjetoSchema = new Schema(projetoSchema);

module.exports = mongoose.model('Projetos', ProjetoSchema);
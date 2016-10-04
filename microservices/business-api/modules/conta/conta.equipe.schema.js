'use strict';
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

module.exports = {
  nome:           {type: String, required: true, min: 3, max: 200},
  projeto: {type: Schema.Types.ObjectId, ref: 'Projetos'},
  acessos: {type: Schema.Types.ObjectId, ref: 'Acessos'},
  membros: [{type: Schema.Types.ObjectId, ref: 'Contas'}],
  ativo:          {type: Boolean, default: true}
};
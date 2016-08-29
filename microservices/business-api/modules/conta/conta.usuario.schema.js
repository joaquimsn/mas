'use strict';
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

module.exports = {
  nome:           {type: String, required: true, min: 3, max: 200},
  email:          {type: String, min: 6, max: 128},
  senha:          {type: String},
  projetos:       [{type: Schema.Types.ObjectId}],
  ativo:          {type: Boolean, default: true},
  configuracoes:  {type: Object}
};
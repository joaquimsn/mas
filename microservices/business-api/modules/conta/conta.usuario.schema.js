'use strict';
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

module.exports = {
  nome:           {type: String, required: true, min: 3, max: 200},
  email:          {type: String, min: 6, max: 128},
  senha:          {type: String},
  projetos:       [
    {
      proprio: {type: Boolean},
      projeto: {type: Schema.Types.ObjectId, ref: 'Projetos'},
      status: {
        codigo : {type: Number},
        display: {type: String}
      } 
    }
  ],
  ativo:          {type: Boolean, default: true},
  configuracoes:  {type: Object}
};

// Novo Schema

/*
 nome:           {type: String, required: true, min: 3, max: 200},
  email:          {type: String, min: 6, max: 128},
  senha:          {type: String},
  projetos:       [{type: Schema.Types.ObjectId}],
  ativo:          {type: Boolean, default: true},
  equipes: [
    { nome:    {type: String, required: true, min: 3, max: 200},
      projeto: {type: Schema.Types.ObjectId, ref: 'Projetos'},
      acessos: {type: Schema.Types.ObjectId, ref: 'Acessos'},
      membros: [{type: Schema.Types.ObjectId, ref: 'Contas'}],
      ativo:   {type: Boolean, default: true}
    }
  ],
  configuracoes:  {type: Object}
*/
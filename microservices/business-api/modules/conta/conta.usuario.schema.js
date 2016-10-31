'use strict';
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var objectStatus = {
  codigo : {type: Number, default: 1},
  display: {type: String, default: 'Ativo'}
}; 

module.exports = {
  nome:           {type: String, required: true, min: 3, max: 200},
  email:          {type: String, min: 6, max: 128, required: true,},
  senha:          {type: String, required: true,},
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
  equipes: [
    {
      nome:  {type: String, min: 3, max: 60},
      membros: [
        {
          usuario: {type: Schema.Types.ObjectId, ref: 'Usuarios'},
          status: objectStatus    
        }
      ],
      status: objectStatus
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
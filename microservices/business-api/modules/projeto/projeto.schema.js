'use strict';
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var objectStatus = {
  codigo : {type: Number, default: 1},
  display: {type: String, default: 'Ativo'}
}; 

module.exports = {
  nome:               {type: String, required: true, min: 3, max: 200},
  descricao:          {type: String, min: 3, max: 600},
  dataInicio:       {type: Date, require: true},
  dataFim:          {type: Date, require: true},
  default:          {type: Boolean},
  modulos:            [
    {
      modulo: {type: Schema.Types.ObjectId, ref: 'Modulos'},
      status: objectStatus
    }
  ],
  kanban:             {type: Schema.Types.ObjectId, ref: 'Kanbans'},
  repositorioGit:     {
    nome: {type: String},
    chave: {type: String}
  },
  gitHub:             {type: Object},
  equipes: [
    {
      _id: {type: Schema.Types.ObjectId},
      nome:  {type: String},
      status: objectStatus
    }
  ],
  usuarios: [{type: Schema.Types.ObjectId, ref: 'Usuarios'}],
  dataCadastro: {type: Date, default: Date.now},
  status: objectStatus
};
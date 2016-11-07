'use strict';
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;
    
module.exports = {
  nome:               {type: String, required: true, min: 3, max: 200},
  descricao:          {type: String, min: 3, max: 600},
  kanban: {type: Schema.Types.ObjectId, ref: 'Kanbans'},
  dataInicio:       {type: Date, require: true},
  dataFim:          {type: Date, require: true},
  equipes: [
    {
      nome:           {type: String, required: true, min: 3, max: 60},
      membros: [{type: Schema.Types.ObjectId, ref: 'Contas'}]
    }
  ],
  dataCadastro:       {type: Date, default: Date.now},
  funcionalidades:  [{type: Schema.Types.ObjectId, ref: 'Funcionalidades'}],
  tarefas:  [{type: Schema.Types.ObjectId, ref: 'Funcionalidades'}],
  status:             {
    codigo : {type: Number},
    display: {type: String}
  }
};
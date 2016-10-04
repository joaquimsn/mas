var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

module.exports = {
  titulo:           {type: String, required: true, min: 3, max: 200},
  descricao:        {type: String, default: ''},
  severidade:       {type: Number, default: ''},
  ordem:            {type: Number, default: 0},
  tags:             [{type: String}],
  dataInicio:       {type: Date, default: Date.now},
  dataFim:          {type: Date, default: Date.now},
  duracao:          {type: Number},
  responsaveis:     [
    {
      nome:   {type: String, default: ''},
      imagem: {type: String, default: ''},
      conta:  {type: Schema.Types.ObjectId}
    }
  ],
  historicos:       [
    {
      acao:      {type: String, required: true, default: ''},
      descricao: {type: String},
      data:      {type: Date, default: Date.now},
      usuario:   {tyepe: Schema.Types.ObjectId}
    }
  ],
  tarefas: [
    {
      nome:         {type: String, required: true, min: 3, max: 200},
      descricao:    {type: String},
      responsaveis: [{tyepe: Schema.Types.ObjectId}]
    }
  ],
  arquivos: [
    {
      link:   {type: String, required: true},
      type:   {type: String}
    }
  ],
  comentarios: [
    {
      mensagem:   {type: String, required: true, min: 2, max: 600},
      usuario: {type: Schema.Types.ObjectId},
      data:   {type: Date, default: Date.now},
    }
  ],
  dataCadastro:       {type: Date, default: Date.now},
  kanban: {type: Schema.Types.ObjectId, ref: 'Kanbans'},
  status:             {
    codigo : {type: Number},
    display: {type: String}
  }
};
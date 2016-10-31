var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var objectStatus = {
  codigo : {type: Number, default: 1},
  display: {type: String, default: 'Ativo'}
}; 

module.exports = {
  titulo:           {type: String, required: true, min: 3, max: 200},
  descricao:        {type: String, default: ''},
  severidade:       {type: Number, default: 0},
  ordem:            {type: Number, default: 0},
  tags:             [{
                      _id: {type: Schema.Types.ObjectId}, 
                      nome:{type: String, required: true, min: 2, max: 200},
                      cor: {type: String}}
  ],
  dataInicio:       {type: Date},
  dataFim:          {type: Date},
  duracao:          {type: Number},
  usuarios: [{type: Schema.Types.ObjectId, ref: 'Usuarios'}],
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
      concluida:         {type: Boolean, default: false},
      titulo:           {type: String, required: true, min: 3, max: 200}
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
  status: objectStatus
};
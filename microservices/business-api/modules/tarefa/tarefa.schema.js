var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

module.exports = {
  titulo:           {type: String, required: true, min: 3, max: 200},
  descricao:        {type: String, default: ''},
  severidade:       {type: Number, default: ''},
  tags:             [{type: String}],
  responsaveis:     [
    {
      nome:   {type: String, default: ''},
      imagem: {type: String, default: ''},
      conta:  {type: Schema.Types.ObjectId}
    }
  ],
  historicos:       [
    {
      acao:     {type: String, required: true, default: ''},
      data:     {type: Date, default: Date.now},
      usuario:  {tyepe: Schema.Types.ObjectId}
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
  status:             {
    codigo : {type: Number},
    display: {type: String}
  }
};
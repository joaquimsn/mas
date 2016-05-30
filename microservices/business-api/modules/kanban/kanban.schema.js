var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

module.exports = {
  nome:               {type: String, required: true, min: 3, max: 30, default: ''},
  quantidadeSecoes:   {type: Number, required: true, default: ''},
  secoes:        [
    {
      nome:             {type: String, required: true, min: 3, max: 30},
      ordem:            {type: Number, required: true, default: 0},
      estadoFinal:      {type: Boolean, default: false},
      tempoPermanencia: {type: Date},
      funcionalidades:  [{type: Schema.Types.ObjectId, ref: 'Funcionalidades'}]
    }
  ]
};
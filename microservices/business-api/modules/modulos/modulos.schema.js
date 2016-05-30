'use strict';

module.exports = {
  nome:               {type: String, required: true, min: 3, max: 200},
  descricao:          {type: String, min: 3, max: 600},
  equipes: [
    {
      nome:           {type: String, required: true, required: true, min: 3, max: 60},
      membros: [
        {
          nome:       {type: String, required: true}
        }
      ]
    }
  ],
  dataCadastro:       {type: Date, default: Date.now},
  status:             {
    codigo : {type: Number},
    display: {type: String}
  }
};
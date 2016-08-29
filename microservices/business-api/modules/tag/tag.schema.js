'use strict';

module.exports = {
  nome:               {type: String, required: true, min: 2, max: 200},
  cor:                {type: String},
  descricao:          {type: String, min: 3, max: 600},
  dataCadastro:       {type: Date, default: Date.now},
  status:             {
    codigo : {type: Number},
    display: {type: String}
  }
};
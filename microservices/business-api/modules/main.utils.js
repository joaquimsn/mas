(function() {
  'use strict';

  function extrairIds(lista) {
    var listaObjetos = lista;
    if(!(lista instanceof Array)) {
      listaObjetos = [];
      listaObjetos.push(lista);
    }

    var listaIds = [];
    for(var index = 0; index < listaObjetos.length; index++) {
      listaIds.push(listaObjetos[index]._id);
    }
    return listaIds;
  }

  module.exports = {
    extrairIds: extrairIds
  };
}());
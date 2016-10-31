'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function HomeService(requestApiService, SessaoService, FuncionalidadeService, ProjetoService) {
  this.findHome = function (cb) {
    requestApiService.get(cb, '/home');
  };

  this.buscarFuncionalidadesProximosDias = function(callback) {
    var idUsuario = SessaoService.getUsuario()._id;
    var dataAtual = new Date();

    var filtro = {
      usuarios: {$eq : idUsuario},
      $and: [
        {dataFim: {$gt: dataAtual.getTime()}}, 
        {dataFim: {$lte: dataAtual.setDate(dataAtual.getDate() + 7)}}
      ]
    };

    FuncionalidadeService.filtrar(callback, filtro);
  };

  this.buscarProjetos = function(callback) {
    function separarProjetosCb(contasProjetos) {
      var projetos = {
        proprios: [],
        vinculados: []
      };

      angular.forEach(contasProjetos, function(contaProjeto) {
        if(contaProjeto.proprio) {
          projetos.proprios.push(contaProjeto.projeto);
        } else {
          projetos.vinculados.push(contaProjeto.projeto);
        }
      });

      callback(projetos);
    }

    ProjetoService.buscarTodosParaRelatorio(separarProjetosCb);
  };
}

servicesModule.service('HomeService', HomeService);
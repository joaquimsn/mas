'use strict';

var servicesModule = require('./_index');

var umDiaMs = 1000 * 60 * 60 * 24;
function intervaloDias(dataIncio, dataTermino) {
    var dataInicioMs = dataIncio.getTime();
    var dataTerminoMs = dataTermino.getTime();

    var diferenca = dataTerminoMs - dataInicioMs;

    return (diferenca / umDiaMs);
}

/**
 * @ngInject
 */
function DashboardService(requestApiService, ModuloService) {
  this.buscarUsuarioDisponivelParaProjeto = function(cb) {
    
    cb({});
  };

  function totalPontos(funcionalidades) {
    var totalPontos = 0;

    angular.forEach(funcionalidades, function(funcionalidade) {
      totalPontos = funcionalidade.severidade + totalPontos;
    });

    return totalPontos;
  }

  function visualizacaoPorPontos(burndown, modulo, periodo) {
    var dataInicio = new Date(modulo.dataInicio);
    var dataFim = new Date(modulo.dataFim);
    var intervalo = Math.round(intervaloDias(dataInicio, dataFim));

    var totalDePontos = totalPontos(modulo.funcionalidades);
    var valorIdeal = Math.round(totalDePontos / intervalo);

    var resultadoSubtracao = totalDePontos;
    var dataTrabalho = angular.copy(dataInicio);

    burndown.esperado.push(angular.copy(resultadoSubtracao));
    for(var index = 0; index <= intervalo; index ++) {
      resultadoSubtracao = resultadoSubtracao - valorIdeal;
      burndown.esperado.push(angular.copy(resultadoSubtracao));

      //function buscarTarefaPorData(tarefa) {
        //var data
      //}
    } 
  }

  this.criarBurndown = function(callback, modulo, visualizacao, periodo) {
    var filtro = {
      _id: modulo._id
    };

    function montarBurndown(retorno) {
      retorno =  retorno[0];
      console.log('retorno', retorno);
      var burndown = {
        esperado:  [],
        andamento: []
      };

      if(visualizacao.value === "pontos") {
        visualizacaoPorPontos(burndown, retorno, periodo);
      }

      callback(burndown);
    }
    
    ModuloService.filtrar(montarBurndown, filtro);
  };
}

servicesModule.service('DashboardService', DashboardService);
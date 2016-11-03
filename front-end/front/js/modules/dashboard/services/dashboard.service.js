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

  this.criarBurndown = function(callback, modulo) {
    var filtro = {
      _id: modulo._id
    };

    function montarBurndown(retorno) {
      retorno =  retorno[0];
      console.log('retorno', retorno);
      var burndown = {
        esperado:  [80, 60, 40, 20, 0],
        andamento: [80, 60, 30, 25, 0]
      };

      var intervalo = intervaloDias(new Date(retorno.dataInicio), new Date(retorno.dataFim));

      var valorIdeal = intervalo / (retorno.funcionalidades.length + 1);
  
      var resultadoSub = intervalo;
      angular.forEach(retorno.funcionalidades, function(func) {
        
        //burndown.esperado.push(angular.copy(resultadoSub));
        resultadoSub = resultadoSub - valorIdeal;
      });

      callback(burndown);
    }
    
    ModuloService.filtrar(montarBurndown, filtro);
  };
}

servicesModule.service('DashboardService', DashboardService);
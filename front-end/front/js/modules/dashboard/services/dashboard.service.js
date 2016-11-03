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

  function labelDia(data) {
    var diaSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

    return diaSemana[data.getDay()] + " - " + data.getDate() + " / " + data.getMonth() + 1;
  }

  function visualizacaoPorPontosAndDias(burndown, modulo, periodo) {
    var dataInicio = new Date(modulo.dataInicio);
    var dataFim = new Date(modulo.dataFim);
    var dataAtual = new Date();
    var intervalo = Math.round(intervaloDias(dataInicio, dataFim));

    var totalDePontos = totalPontos(modulo.funcionalidades);
    var valorIdeal = Math.round(totalDePontos / intervalo);

    var resultadoSubtracao = angular.copy(totalDePontos);
    var dataTrabalho = angular.copy(dataInicio);
    
    burndown.esperado.push(angular.copy(resultadoSubtracao));
    for(var index = 0; index <= intervalo; index ++) {
      // Label y
      burndown.periodo.push(labelDia(dataTrabalho));
      
      resultadoSubtracao = resultadoSubtracao - valorIdeal;
      burndown.esperado.push(angular.copy(resultadoSubtracao));

      // Busca as tarefas para o dia corrente
      function buscarTarefaPorData(tarefa) {
        if (tarefa.dataFim) {
          var dataTarefa = new Date(tarefa.getDateFim);
          return (dataTrabalho.getDate() === dataTarefa.getDate() && 
                  dataTarefa.getMonth() === dataTrabalho.getMonth() &&
                  tarefa.getStatus.codigo == 10);
        } else {
          return false;
        }
      }

      var tarefaRealizadasNoDiaTrabalho = modulo.funcionalidades.filter(buscarTarefaPorData);
      var pontosRealizados = totalPontos(tarefaRealizadasNoDiaTrabalho);

      if (pontosRealizados > 0) {
        totalDePontos = totalDePontos - pontosRealizados;
        burndown.andamento.push(totalDePontos);
      } else {
        if(dataTrabalho <= dataAtual) {
          burndown.andamento.push(totalDePontos);
        }
      }

      // Acrescena um dia de trabalho
      dataTrabalho.setDate(dataTrabalho.getDate + 1);
    } 
  }

   function visualizacaoPorPontosAndSemanas(burndown, modulo, periodo) {
    var dataInicio = new Date(modulo.dataInicio);
    var dataFim = new Date(modulo.dataFim);
    var dataAtual = new Date();
    var intervalo = Math.round(intervaloDias(dataInicio, dataFim));

    var totalDePontos = totalPontos(modulo.funcionalidades);
    // ideal por semana
    var valorIdeal = Math.round(totalDePontos / (intervalo / 7)) ;

    var resultadoSubtracao = angular.copy(totalDePontos);
    var dataTrabalho = angular.copy(dataInicio);
    
    burndown.esperado.push(angular.copy(resultadoSubtracao));
    for(var index = 0, sem = 1; index <= intervalo; index = index + 6, sem ++) {
      // Label y
      burndown.periodo.push("Semana - " + sem);
      
      // final 
      resultadoSubtracao = resultadoSubtracao - valorIdeal;

      burndown.esperado.push(angular.copy(resultadoSubtracao));

      // Busca as tarefas para o dia corrente
      function buscarTarefaPorData(tarefa) {
        if (tarefa.dataFim) {
          var dataTarefa = new Date(tarefa.getDateFim);
          return (dataTrabalho.getDate() >= dataTarefa.getDate() && tarefa.getStatus.codigo == 10);
        } else {
          return false;
        }
      }

      var tarefaRealizadasNoDiaTrabalho = modulo.funcionalidades.filter(buscarTarefaPorData);
      var pontosRealizados = totalPontos(tarefaRealizadasNoDiaTrabalho);

      if (pontosRealizados > 0) {
        totalDePontos = totalDePontos - pontosRealizados;
        burndown.andamento.push(totalDePontos);
      } else {
        if(dataTrabalho <= dataAtual) {
          burndown.andamento.push(totalDePontos);
        }
      }

      // Acrescena um dia de trabalho
      dataTrabalho.setDate(dataTrabalho.getDate + 7);
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
        andamento: [],
        periodo: []
      };

      if(visualizacao.value === "pontos" && periodo.value === "dias") {
        visualizacaoPorPontosAndDias(burndown, retorno, periodo);
      }

      if(visualizacao.value === "pontos" && periodo.value === "semanas") {
        visualizacaoPorPontosAndSemanas(burndown, retorno, periodo);
      }

      callback(burndown);
    }
    
    ModuloService.filtrar(montarBurndown, filtro);
  };
}

servicesModule.service('DashboardService', DashboardService);
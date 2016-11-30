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

  function totalPontos(tarefas) {
    var totalPontos = 0;

    angular.forEach(tarefas, function(funcionalidade) {
      totalPontos += funcionalidade.severidade;
    });

    return totalPontos;
  }

  function totalHoras(tarefas) {
    var totalHoras = 0;

    angular.forEach(tarefas, function(funcionalidade) {
      totalHoras += funcionalidade.duracao;
    });

    return totalHoras;
  }

  function labelDia(data) {
    var diaSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

    return diaSemana[data.getDay()] + " - " + data.getDate() + " / " + (data.getMonth() + 1);
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
    for(var index = 0; index < intervalo; index ++) {
      // Label y
      burndown.periodo.push(labelDia(dataTrabalho));
      
      resultadoSubtracao = resultadoSubtracao - valorIdeal;
      burndown.esperado.push(angular.copy(resultadoSubtracao));

      function todasTarefasFechada(funcionalidade) {
        funcionalidade.tarefas = modulo.tarefas.filter(function(item) {
          return item.funcionalidade === funcionalidade._id;
        });

        var abertas = funcionalidade.tarefas.filter(function(item) {
          return item.status.codigo !== 10;
        });

        return funcionalidade.tarefas.length > 0 && abertas.length === 0;
      }

      // Busca as tarefas para o dia corrente
      function buscarTarefaFechadaPorData(funcionalidade) {
        if (funcionalidade.dataFim) {
          var dataFuncionalidade = new Date(funcionalidade.dataFim);
          return (dataTrabalho.getDate() === dataFuncionalidade.getDate() && 
                  dataFuncionalidade.getMonth() === dataTrabalho.getMonth() &&
                  todasTarefasFechada(funcionalidade));
        } else {
          return false;
        }
      }

      var tarefaRealizadasNoDiaTrabalho = modulo.funcionalidades.filter(buscarTarefaFechadaPorData);
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
      dataTrabalho.setDate(dataTrabalho.getDate() + 1);
    } 
  }

   function visualizacaoPorPontosAndSemanas(burndown, modulo, periodo) {
    var dataInicio = new Date(modulo.dataInicio);
    var dataFim = new Date(modulo.dataFim);
    var dataAtual = new Date();
    var intervalo = Math.trunc(intervaloDias(dataInicio, dataFim));
    console.log("intervalo", intervalo);
    var totalDePontos = totalPontos(modulo.tarefas);
    var quantidadeSemana = Math.round(intervalo / 7);
    // ideal por semana
    var valorIdeal = Math.trunc(totalDePontos / quantidadeSemana) ;
    console.log('valorIdeal Semana',  valorIdeal);

    var resultadoSubtracao = angular.copy(totalDePontos);
    var dataTrabalho = angular.copy(dataInicio);
    
    burndown.esperado.push(angular.copy(resultadoSubtracao));
    for(var index = 1; index <= quantidadeSemana; index++) {
      // Label y
      burndown.periodo.push("Semana - " + index);
      
      // final 
      resultadoSubtracao = resultadoSubtracao - valorIdeal;

      burndown.esperado.push(angular.copy(resultadoSubtracao < 0 ? 0 : resultadoSubtracao));

      function todasTarefasFechada(funcionalidade) {
        funcionalidade.tarefas = modulo.tarefas.filter(function(item) {
          return item.funcionalidade === funcionalidade._id;
        });

        var abertas = funcionalidade.tarefas.filter(function(item) {
          return item.status.codigo !== 10;
        });

        return funcionalidade.tarefas.length > 0 && abertas.length === 0;
      }

      // Busca as tarefas para o dia corrente
      function buscarTarefaFechadaPorData(funcionalidade) {
        if (funcionalidade.dataFim) {
          var dataFuncionalidade = new Date(funcionalidade.dataFim);
          return (dataTrabalho.getDate() === dataFuncionalidade.getDate() && 
                  dataFuncionalidade.getMonth() === dataTrabalho.getMonth() &&
                  todasTarefasFechada(funcionalidade));
        } else {
          return false;
        }
      }

      var tarefaRealizadasNoDiaTrabalho = modulo.funcionalidades.filter(buscarTarefaFechadaPorData);
      var pontosRealizados = totalPontos(tarefaRealizadasNoDiaTrabalho);

      if (pontosRealizados > 0) {
        totalDePontos = totalDePontos - pontosRealizados;
        burndown.andamento.push(totalDePontos < 0 ? 0 : totalDePontos);
      } else {
        if(dataTrabalho <= dataAtual) {
          burndown.andamento.push(totalDePontos);
        }
      }

      // Acrescena um dia de trabalho
      dataTrabalho.setDate(dataTrabalho.getDate() + 7);
    } 
  }

  function visualizacaoPorTarefasAndDias(burndown, funcionalidade, periodo) {
    var dataInicio = new Date(funcionalidade.dataInicio);
    var dataFim = new Date(funcionalidade.dataFim);
    var dataAtual = new Date();
    var intervalo = Math.round(intervaloDias(dataInicio, dataFim));

    var quantidadeDeTarefas = funcionalidade.tarefas.length;
    var valorIdeal = Math.round(quantidadeDeTarefas / intervalo);
    var resultadoSubtracao = angular.copy(quantidadeDeTarefas);
    var dataTrabalho = angular.copy(dataInicio);
    
    burndown.esperado.push(angular.copy(resultadoSubtracao));
    for(var index = 0; index < intervalo; index ++) {
      // Label y
      burndown.periodo.push(labelDia(dataTrabalho));
      
      resultadoSubtracao = resultadoSubtracao - valorIdeal;
      burndown.esperado.push(angular.copy(resultadoSubtracao));

      // Busca as tarefas para o dia corrente
      function buscarTarefaFechadaPorData(tarefa) {
        if (tarefa.dataFim) {
          var dataTarefa = new Date(tarefa.dataFim);
          return (dataTrabalho.getDate() === dataTarefa.getDate() && 
                  dataTarefa.getMonth() === dataTrabalho.getMonth() &&
                  tarefa.status.codigo == 10);
        } else {
          return false;
        }
      }

      var tarefaRealizadasNoDiaTrabalho = funcionalidade.tarefas.filter(buscarTarefaFechadaPorData);
      var tarefasRealizadas = tarefaRealizadasNoDiaTrabalho.length;

      if (tarefasRealizadas > 0) {
        quantidadeDeTarefas = quantidadeDeTarefas - tarefasRealizadas;
        burndown.andamento.push(quantidadeDeTarefas);
      } else {
        if(dataTrabalho <= dataAtual) {
          burndown.andamento.push(quantidadeDeTarefas);
        }
      }

      // Acrescena um dia de trabalho
      dataTrabalho.setDate(dataTrabalho.getDate() + 1);
    } 
  }

   function visualizacaoPorTarefasAndSemanas(burndown, funcionalidade, periodo) {
    var dataInicio = new Date(funcionalidade.dataInicio);
    var dataFim = new Date(funcionalidade.dataFim);
    var dataAtual = new Date();
    var intervalo = Math.trunc(intervaloDias(dataInicio, dataFim));
   
    var quantidadeDeTarefas = funcionalidade.tarefas.length;
    var quantidadeSemana = Math.round(intervalo / 7);
    // ideal por semana
    var valorIdeal = Math.trunc(quantidadeDeTarefas / quantidadeSemana) ;

    var resultadoSubtracao = angular.copy(quantidadeDeTarefas);
    var dataTrabalho = angular.copy(dataInicio);
    
    burndown.esperado.push(angular.copy(resultadoSubtracao));
    for(var index = 1; index <= quantidadeSemana; index++) {
      // Label y
      burndown.periodo.push("Semana - " + index);
      
      // final 
      resultadoSubtracao = resultadoSubtracao - valorIdeal;

      burndown.esperado.push(angular.copy(resultadoSubtracao < 0 ? 0 : resultadoSubtracao));

      // Busca as tarefas para o dia corrente
      function buscarTarefaFechadaPorData(tarefa) {
        if (tarefa.dataFim) {
          var dataTarefa = new Date(tarefa.dataFim);
          return (dataTrabalho.getDate() >= dataTarefa.getDate() && tarefa.status.codigo == 10);
        } else {
          return false;
        }
      }

      var tarefaRealizadasNoDiaTrabalho = funcionalidade.tarefas.filter(buscarTarefaFechadaPorData);
      var tarefasRealizadas = tarefaRealizadasNoDiaTrabalho.length;

      if (tarefasRealizadas > 0) {
        quantidadeDeTarefas = quantidadeDeTarefas - tarefasRealizadas;
        burndown.andamento.push(quantidadeDeTarefas < 0 ? 0 : quantidadeDeTarefas);
      } else {
        if(dataTrabalho <= dataAtual) {
          burndown.andamento.push(quantidadeDeTarefas);
        }
      }

      // Acrescena um dia de trabalho
      dataTrabalho.setDate(dataTrabalho.getDate() + 7);
    } 
  }

    function visualizacaoPorHorasAndDias(burndown, funcionalidade, periodo) {
    var dataInicio = new Date(funcionalidade.dataInicio);
    var dataFim = new Date(funcionalidade.dataFim);
    var dataAtual = new Date();
    var intervalo = Math.round(intervaloDias(dataInicio, dataFim));

    var totalDeHoras = totalHoras(funcionalidade.tarefas);
    var valorIdeal = Math.round(totalDeHoras / intervalo);

    var resultadoSubtracao = angular.copy(totalDeHoras);
    var dataTrabalho = angular.copy(dataInicio);
    
    burndown.esperado.push(angular.copy(resultadoSubtracao));
    for(var index = 0; index < intervalo; index ++) {
      // Label y
      burndown.periodo.push(labelDia(dataTrabalho));
      
      resultadoSubtracao = resultadoSubtracao - valorIdeal;
      burndown.esperado.push(angular.copy(resultadoSubtracao));

      // Busca as tarefas para o dia corrente
      function buscarTarefaFechadaPorData(tarefa) {
        if (tarefa.dataFim) {
          var dataTarefa = new Date(tarefa.dataFim);
          return (dataTrabalho.getDate() === dataTarefa.getDate() && 
                  dataTarefa.getMonth() === dataTrabalho.getMonth() &&
                  tarefa.status.codigo == 10);
        } else {
          return false;
        }
      }

      var tarefaRealizadasNoDiaTrabalho = funcionalidade.tarefas.filter(buscarTarefaFechadaPorData);
      var HorasRealizadas = totalHoras(tarefaRealizadasNoDiaTrabalho);

      if (HorasRealizadas > 0) {
        totalDeHoras = totalDeHoras - HorasRealizadas;
        burndown.andamento.push(totalDeHoras);
      } else {
        if(dataTrabalho <= dataAtual) {
          burndown.andamento.push(totalDeHoras);
        }
      }

      // Acrescena um dia de trabalho
      dataTrabalho.setDate(dataTrabalho.getDate() + 1);
    } 
  }

   function visualizacaoPorHorasAndSemanas(burndown, funcionalidade, periodo) {
    var dataInicio = new Date(funcionalidade.dataInicio);
    var dataFim = new Date(funcionalidade.dataFim);
    var dataAtual = new Date();
    var intervalo = Math.trunc(intervaloDias(dataInicio, dataFim));

    var totalDeHoras = totalHoras(funcionalidade.tarefas);
    var quantidadeSemana = Math.round(intervalo / 7);
    // ideal por semana
    var valorIdeal = Math.trunc(totalDeHoras / quantidadeSemana) ;

    var resultadoSubtracao = angular.copy(totalDeHoras);
    var dataTrabalho = angular.copy(dataInicio);
    
    burndown.esperado.push(angular.copy(resultadoSubtracao));
    for(var index = 1; index <= quantidadeSemana; index++) {
      // Label y
      burndown.periodo.push("Semana - " + index);
      
      // final 
      resultadoSubtracao = resultadoSubtracao - valorIdeal;

      burndown.esperado.push(angular.copy(resultadoSubtracao < 0 ? 0 : resultadoSubtracao));

      // Busca as tarefas para o dia corrente
      function buscarTarefaFechadaPorData(tarefa) {
        if (tarefa.dataFim) {
          var dataTarefa = new Date(tarefa.dataFim);
          return (dataTrabalho.getDate() >= dataTarefa.getDate() && tarefa.status.codigo == 10);
        } else {
          return false;
        }
      }

      var tarefaRealizadasNoDiaTrabalho = funcionalidade.tarefas.filter(buscarTarefaFechadaPorData);
      var HorasRealizadas = totalHoras(tarefaRealizadasNoDiaTrabalho);

      if (HorasRealizadas > 0) {
        totalDeHoras = totalDeHoras - HorasRealizadas;
        burndown.andamento.push(totalDeHoras < 0 ? 0 : totalDeHoras);
      } else {
        if(dataTrabalho <= dataAtual) {
          burndown.andamento.push(totalDeHoras);
        }
      }

      // Acrescena um dia de trabalho
      dataTrabalho.setDate(dataTrabalho.getDate() + 7);
    } 
  }

  this.criarBurndown = function(callback, modulo, funcionalidade, visualizacao, periodo) {
    var filtro = {
      _id: modulo._id
    };

    function montarBurndown(retorno) {
      retorno =  retorno[0] || {};
      var burndown = {
        esperado:  [],
        andamento: [],
        periodo: []
      };
      
      funcionalidade.tarefas = retorno.tarefas.filter(function(item) {
        return item.funcionalidade === funcionalidade._id;
      });

      if(visualizacao.value === "pontos" && periodo.value === "dias") {
        visualizacaoPorPontosAndDias(burndown, funcionalidade, periodo);
      }

      if(visualizacao.value === "pontos" && periodo.value === "semanas") {
        visualizacaoPorPontosAndSemanas(burndown, funcionalidade, periodo);
      }

      if(visualizacao.value === "tarefas" && periodo.value === "dias") {
        visualizacaoPorTarefasAndDias(burndown, funcionalidade, periodo);
      }

      if(visualizacao.value === "tarefas" && periodo.value === "semanas") {
        visualizacaoPorTarefasAndSemanas(burndown, funcionalidade, periodo);
      }

      if(visualizacao.value === "horas" && periodo.value === "dias") {
        visualizacaoPorHorasAndDias(burndown, funcionalidade, periodo);
      }

      if(visualizacao.value === "horas" && periodo.value === "semanas") {
        visualizacaoPorHorasAndSemanas(burndown, funcionalidade, periodo);
      }

      callback(burndown);
    }
    
    ModuloService.filtrar(montarBurndown, filtro);
  };

  this.criarBurndownPontos = function(callback, modulo, visualizacao, periodo) {
    var filtro = {
      _id: modulo._id
    };

    function montarBurndown(retorno) {
      retorno =  retorno[0] || {};
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
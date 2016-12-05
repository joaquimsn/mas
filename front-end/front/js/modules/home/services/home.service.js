'use strict';

var servicesModule = require('./_index');

function _countTarefasFechadas(tarefas) {
  var total = 0;
  angular.forEach(tarefas, function(tarefa) {
    if(tarefa.status.codigo == 10) {
      total ++; 
    }
  });

  return total;
}

/**
 * @ngInject
 */
function HomeService(requestApiService, SessaoService, FuncionalidadeService, ProjetoService, ModuloService) {
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

  this.buscarAndamento = function(callback, projeto) {
    function buscarModulos(projeto) {
      var modulos = projeto.modulos.map(function(pm) {
        return pm.modulo;
      });

      var filtro = {
        _id: {$in: modulos}
      };

      function calcularAndamento(modulos) {
        var quantidadeTotalTarefas = 0;
        var quantidadeTarefasRealizadas = 0;

        angular.forEach(modulos, function(modulo) {
          quantidadeTotalTarefas += modulo.tarefas.length;
          quantidadeTarefasRealizadas = _countTarefasFechadas(modulo.tarefas);
        });

        var andamento = (quantidadeTarefasRealizadas * 100) / quantidadeTotalTarefas;
        
        // devolve a porcentagem do andamento do projeot
        callback(Math.round(andamento));
      }

      // Busca todas todas as tarefas dos modulos do projeto
      ModuloService.filtrar(calcularAndamento, filtro);
    }

    ProjetoService.buscarPorId(buscarModulos, projeto._id);
  };
}

servicesModule.service('HomeService', HomeService);
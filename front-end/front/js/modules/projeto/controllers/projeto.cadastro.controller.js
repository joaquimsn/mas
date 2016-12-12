'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ProjetoCadastroController($scope, ProjetoService, globalMessage, SessaoService, ContaService) {
  function cadastroCb(promisse) {
    promisse.success(function (projeto) {
      ContaService.adicionarProjeto(projeto, SessaoService.getUsuario()._id);
      
      globalMessage.info("Projeto cadastrado com sucesso");
      delete $scope.novoProjeto;
    });
    promisse.error(function (err) {
      globalMessage.error("Não foi possível cadastrar o Porjeto tente novamente.");
      console.log(err);
    });
  }

  function copiarUsuariosEquipe(projeto) {
    projeto.usuarios = [] || projeto.usuarios;
    projeto.usuariosParaVinculo = [];

    angular.forEach(projeto.equipes, function(item) {
      if(item.membros) {
        projeto.usuarios = projeto.usuarios.concat(item.membros);
        projeto.usuariosParaVinculo = projeto.usuariosParaVinculo.concat(item.membros);
      }
    });
  }
  
  $scope.cadastrar = function(projeto) {
    if(projeto.dataFim && projeto.dataFim < projeto.dataInicio) {
      globalMessage.warn('A data fim não pode ser menor que a data de início.');
    } else {
      copiarUsuariosEquipe(projeto);
      ProjetoService.cadastrar(cadastroCb, projeto);
    }
  };

  function inicializar() {
    $scope.cadastro = true;

  }
  inicializar();
}

controllersModule.controller('ProjetoCadastroController', ProjetoCadastroController);
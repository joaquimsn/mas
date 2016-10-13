'use strict';

var servicesModule = require('./_index');

function VinculoProjeto(projeto) {
  return {
      proprio: true,
      projeto: projeto
    };
}

/**
 * @ngInject
 */
function ContaService(requestApiService) {
  this.cadastrar = function(callback, conta) {
    requestApiService.postNo(callback, conta, '/contas');
  };

  this.alterar = function(callback, conta) {
    requestApiService.putNo(callback, conta, '/contas/' + conta._id);
  };

  this.buscarPorId = function(callback, id) {
    requestApiService.getNo(callback, '/contas/' + id);
  };

  this.adicionarProjeto = function(projeto, idConta) {
    function retornoCb(data) {
      console.log('Adicionado projeto a conta', data);
    }

    console.log('Projeto recem cadastrado', projeto);
    var vinculo = new VinculoProjeto(projeto);
    console.log('Vinculo projeto', vinculo);
    requestApiService.putNo(retornoCb, vinculo, '/contas/' + idConta + '/projetos');
  };
}

servicesModule.service('ContaService', ContaService);
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

  this.salvarConfiguracoes = function(callback, conta) {
    requestApiService.putNo(callback, conta.configuracoes, '/contas/' + conta._id + '/configuracoes');
  };

  this.buscarPorId = function(callback, id) {
    requestApiService.getNo(callback, '/contas/' + id);
  };

  this.adicionarProjeto = function(projeto, idConta) {
    function retornoCb(data) {
      console.log('Adicionado projeto a conta', data);
    }

    var vinculo = new VinculoProjeto(projeto);
    requestApiService.putNo(retornoCb, vinculo, '/contas/' + idConta + '/projetos');
  };

  // Quando não existe uma conta com o email, é gerado um novo cadastro
  this.buscarPorEmail = function(callback, email) {
    requestApiService.getNo(callback,  '/contas/email/' + email);
  };
}

servicesModule.service('ContaService', ContaService);
'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ConfiguracaoController($scope, ContaService, SessaoService, globalMessage) {
    
    function salvar(usuairo) {
      ContaService.salvarConfiguracoes(function() {
        globalMessage.info('Configuração salva com sucesso');
      }, usuairo);
    }

    function inicializar() {
      var usuario = SessaoService.getUsuario();
      usuario.configuracoes = usuario.configuracoes || {github: {}};
      $scope.usuario = usuario;
      $scope.salvar = salvar;
    }
    inicializar();
}

controllersModule.controller('ConfiguracaoController', ConfiguracaoController);

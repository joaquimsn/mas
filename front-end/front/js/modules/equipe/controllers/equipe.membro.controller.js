'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function EquipeMembroController(equipe, $scope, EquipeService, ContaService, globalMessage) {
  function buscarMembrosCb(membros) {
    $scope.membros = membros;
  }

  function adicionarMembro(usuario) {
    $scope.membros.push(usuario);
  }

  function adicionarUsuarioPorEmail(email) {
    function buscarEmailCb(usuario) {
      EquipeService.adicionarMembro(function(){}, usuario, $scope.equipeSelecionada);

      adicionarMembro(usuario);
      globalMessage.info('Membro adicionado com sucesso!');

      $scope.emailCadastro = '';
    }

    ContaService.buscarPorEmail(buscarEmailCb, email);
  }

  function inicializar() {
    $scope.equipeSelecionada = equipe;
    $scope.imagemDefault = '/build/images/default/user.png';

    $scope.adicionarUsuario = adicionarUsuarioPorEmail;

    EquipeService.buscarMembros(buscarMembrosCb, equipe);
  }
  inicializar();
}

controllersModule.controller('EquipeMembroController', EquipeMembroController);
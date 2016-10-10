'use strict';

/**
 * @ngInject
 */
function routerConfig($routeProvider, $locationProvider, SystemUriConfig) {
  $routeProvider.
    when(SystemUriConfig.login, {
      templateUrl: 'expose/login/login'
    }).
    when(SystemUriConfig.home, {
      templateUrl: 'expose/home/home',
    }).
    when(SystemUriConfig.projeto, {
      templateUrl: 'expose/projeto/projeto',
    }).
    when(SystemUriConfig.projetoCadastro, {
      templateUrl: 'expose/projeto/projeto-formulario',
    }).
    when(SystemUriConfig.projetoAlteracao, {
      templateUrl: 'expose/projeto/projeto-formulario',
    }).
    when(SystemUriConfig.equipe, {
      templateUrl: 'expose/equipe/equipe',
    }).
    when(SystemUriConfig.configuracao, {
      templateUrl: 'expose/configuracao/configuracao',
    }).
    when(SystemUriConfig.gestaoProjetoDashboard, {
      templateUrl: 'expose/dashboard/dashboard',
    }).
    when(SystemUriConfig.gestaoProjetoKanbanModulo, {
      templateUrl: 'expose/kanban/kanban-modulo',
      controller: 'KanbanController'
    }).
    // when(SystemUriConfig.funcionalidade, {
    //   templateUrl: 'expose/funcionalidade/funcionalidade',
    //   controller: 'FuncionalidadeController'
    // }).
    // when(SystemUriConfig.funcionalidadeVisualizacao, {
    //   templateUrl: 'expose/funcionalidade/funcionalidade'
    // }).
    when(SystemUriConfig.gestaoProjetoModulo, {
      templateUrl: 'expose/modulo/modulo',
      controller: 'ModuloController'
    }).
    when(SystemUriConfig.gestaoProjetoModuloCadastro, {
      templateUrl: 'expose/modulo/modulo-formulario',
      controller: 'ModuloCadastroController'
    }).
    when(SystemUriConfig.gestaoProjetoModuloAlteracao, {
      templateUrl: 'expose/modulo/modulo-formulario',
      controller: 'ModuloAlteracaoController'
    }).
    when(SystemUriConfig.gestaoProjetoTag, {
      templateUrl: 'expose/tag/tag',
    }).
    when(SystemUriConfig.gestaoProjetoTagCadastro, {
      templateUrl: 'expose/tag/tag-formulario',
    }).
    when(SystemUriConfig.gestaoProjetoTagAlteracao, {
      templateUrl: 'expose/tag/tag-formulario',
    }).
    when(SystemUriConfig.notFound, {
      templateUrl: 'expose/main/404'
    }).
    otherwise({
      redirectTo: SystemUriConfig.notFound
    });
  $locationProvider.html5Mode(true);
}

module.exports = routerConfig;
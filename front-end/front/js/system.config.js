'use strict';

/**
 * @ngInject
 */
function routerConfig($routeProvider, $locationProvider, SystemUriConfig) {
  $routeProvider.
    when(SystemUriConfig.home, {
      templateUrl: 'expose/home/home',
      controller: 'HomeController'
    }).
    when(SystemUriConfig.kanban, {
      templateUrl: 'expose/kanban/kanban-modulo',
      controller: 'KanbanController'
    }).
    when(SystemUriConfig.funcionalidadeCadastro, {
      templateUrl: 'expose/funcionalidade/funcionalidade',
      controller: 'FuncionalidadeController'
    }).
    when(SystemUriConfig.funcionalidadeVisualizacao, {
      templateUrl: 'expose/funcionalidade/funcionalidade',
      controller: 'FuncionalidadeController'
    }).
    when(SystemUriConfig.modulo, {
      templateUrl: 'expose/modulo/modulo',
      controller: 'ModuloController'
    }).
    otherwise({
      redirectTo: SystemUriConfig.notFound
    });
  $locationProvider.html5Mode(true);
}

module.exports = routerConfig;
'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function NotFoundController($scope) {
  $scope.message = 'Página não encontrada';
}

controllersModule.controller('NotFoundController', NotFoundController);
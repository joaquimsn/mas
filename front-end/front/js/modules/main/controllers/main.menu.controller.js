'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function MenuController($scope, AuthService, $window) {
  $scope.menuMobileClose = true;

  $scope.openMenu = function () {
    $scope.menuMobileClose = false;
  };

  $scope.closeMenu = function () {
    $scope.menuMobileClose = true;
  };

  $scope.restrictMenu = function () {
    return AuthService.userAuthenticated();
  };

  $scope.logout = function () {
    AuthService.logout();
    $window.location.reload();
  };
}

controllersModule.controller('MenuController', MenuController);
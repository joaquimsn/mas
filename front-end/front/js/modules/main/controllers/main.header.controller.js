'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function HeaderController($rootScope, $scope) {
  $rootScope.showMenuLeft = false;

  $scope.showMenuToggle = function(showMenuLeft) {
    var element = angular.element(document.getElementsByClassName('left-menu')[0]);
    if (showMenuLeft) {
      element.removeClass('--expand');
    } else {
      element.addClass('--expand');
    }

    $rootScope.showMenuLeft = !showMenuLeft;
  };
}

controllersModule.controller('HeaderController', HeaderController);
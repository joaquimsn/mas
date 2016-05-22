'use strict';

var directivesModule = require('./_index');

/**
 * @ngInject
 */
function deviceDetector($window, layoutSize) {
  return {
    restrict: 'A',
    link: function (scope, element) {
      var w = angular.element($window);
      scope.getWindowDimensions = function () {
        return {
          'h': w[0].innerHeight,
          'w': w[0].innerWidth
        };
      };
      scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
        scope.windowHeight    = newValue.h;
        scope.windowWidth     = newValue.w;
        scope.device          = _buildStringDevice(scope.windowWidth, layoutSize);
        scope.isMobile        = isMobile(scope.windowWidth, layoutSize);
        scope.isDesktop       = isDesktop(scope.windowWidth, layoutSize);
      }, true);

      w.bind('resize', function () {
        scope.$apply();
      });
    }
  };
}

function _buildStringDevice(width, layoutSize) {
  return (width < layoutSize.resWidthHiddeMenu) ? 'mobile' : 'desktop';
}

function isMobile(width, layoutSize) {
  return (width < layoutSize.resWidthHiddeMenu);
}

function isDesktop(width, layoutSize) {
  return (width >= layoutSize.resWidthHiddeMenu);
}

directivesModule.directive('deviceDetector', deviceDetector);
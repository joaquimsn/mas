'use strict';

var directivesModule = require('./_index');

/**
 * @ngInject
 */
function showMessage($timeout) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'partials/main/show-message',
    scope: {
      show: "=",
      nivel: "=",
      text: "="
    },
    link: function (scope, element) {
      $timeout(function () {
        element.removeAttr('style');
      }, 1000);

      scope.close = function () {
        scope.show = false;
      };

      scope.$watch('show', function (newValue) {
        $timeout(function () {
          if (newValue === true) {
            scope.show = false;
          }
        }, 5000);
      }, true);
    }
  };
}

directivesModule.directive('showMessage', showMessage);
'use strict';

var directivesModule = require('./_index');

function controller() {
  // body...
}

/**
 * @ngInject
 */
function showModal() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: 'partials/main/modal',
    scope: {
      show: "=",
    },
    controller: controller,
    link: function (scope, element) {
      scope.close = function () {
        scope.show = false;
      };
    }
  };
}

directivesModule.directive('showModal', showModal);
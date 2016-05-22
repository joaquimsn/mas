'use strict';

var moduleDirectives = require('./_index');

/**
 * @ngInject
 */
function selectedMenu($location) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      function setActive() {
        if (attrs.ngHref === $location.path()) {
          element.addClass('linkselected');
        } else {
          element.removeClass('linkselected');
        }
      }
      scope.$on('$locationChangeSuccess', setActive);
    }
  };
}

moduleDirectives.directive('selectedMenu', selectedMenu);


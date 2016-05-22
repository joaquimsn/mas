'use strict';

var directivesModule = require('./_index');

/**
 * @ngInject
 */
function scrollTo($document) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.on('click', function () {
        var element = angular.element(document.getElementById(attrs.scrollTo));
        $document.scrollToElementAnimated(element, 50, 1000);
      });
    }
  };
}

directivesModule.directive('scrollTo', scrollTo);
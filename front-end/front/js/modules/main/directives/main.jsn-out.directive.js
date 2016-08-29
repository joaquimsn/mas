'use strict';

var directivesModule = require('./_index');

/**
 * @ngInject
 */
function jsnOut() {
  return function (scope, element, attrs) {
    element.bind('keydown keypress', function(event) {
      if (event.which === 13 || event.which === 9) {
        scope.$apply(function (){
          scope.$eval(attrs.jsnOut);
        });

        event.preventDefault();
      }
    });
  };
}

directivesModule.directive('jsnOut', jsnOut);
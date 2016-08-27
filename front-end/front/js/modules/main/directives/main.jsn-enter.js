'use strict';

var directivesModule = require('./_index');

/**
 * @ngInject
 */
function jsnEnter() {
  return function (scope, element, attrs) {
    element.bind('keydown keypress', function(event) {
      if (event.which === 13) {
        console.log(event);
        scope.$apply(function (){
          scope.$eval(attrs.jsnEnter);
        });

        event.preventDefault();
      }
    });
  };
}

directivesModule.directive('jsnEnter', jsnEnter);
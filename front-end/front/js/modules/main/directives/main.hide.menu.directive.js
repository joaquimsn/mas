'use strict';

var directivesModule = require('./_index');

/**
 * @ngInject
 */
function hideMenu() {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.on('click', function () {
        var elms = angular.element(document.getElementsByClassName('_show'));
        for(var i = 0; i < elms.length; i++) {
          var elmIndex = angular.element(elms[i]);
          elmIndex.removeClass('_show');
        }
      });
    }
  };
}

directivesModule.directive('hideMenu', hideMenu);
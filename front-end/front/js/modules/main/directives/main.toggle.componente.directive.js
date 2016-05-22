'use strict';

var directivesModule = require('./_index');

function _changeClass(elm, showClass) {
  if (elm.hasClass(showClass)) {
    elm.removeClass(showClass);
  } else {
    elm.addClass(showClass);
  }
}

/**
 * @ngInject
 */
function toggleComponent() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.on('click', function () {
        var showClass     = (attrs.hasOwnProperty('showClass')) ? attrs.showClass : '_show';
        var targetClass   = attrs.targetClass;
        var elms           = angular.element(document.getElementsByClassName(targetClass));
        for(var i = 0; i < elms.length; i++) {
          var elmIndex           = angular.element(elms[i]);
          _changeClass(elmIndex, showClass);
        }

        var targetId      = attrs.targetId;
        var elm           = angular.element(document.getElementById(targetId));
        _changeClass(elm, showClass);
      });
    }
  };
}

directivesModule.directive('toggleComponent', toggleComponent);
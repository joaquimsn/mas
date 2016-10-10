'use strict';

var factoriesModule = require('./_index');

/**
 * @ngInject
 */
function localMessage() {

  function success($scope, text) {
    $scope.localMessage = {
      show:  true,
      nivel: 'success',
      text:  text
    };
  }

  function info ($scope, text) {
    $scope.localMessage = {
      show:  true,
      nivel: 'info',
      text:  text
    };
  }

  function warn ($scope, text) {
    $scope.localMessage = {
      show:  true,
      nivel: 'warn',
      text:  text
    };
  }

  function error ($scope, text) {
    $scope.localMessage = {
      show:  true,
      nivel: 'error',
      text:  text
    };
  }

  return {
    success: success,
    info:    info,
    warn:    warn,
    error:   error
  };
}

factoriesModule.factory('localMessage', localMessage);
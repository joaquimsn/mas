'use strict';

var factoriesModule = require('./_index');

/**
 * @ngInject
 */
function showMessageBuilder() {

  function info ($scope, text) {
    $scope.message = {
      show:  true,
      nivel: 'info',
      text:  text
    };
  }

  function warn ($scope, text) {
    $scope.message = {
      show:  true,
      nivel: 'warn',
      text:  text
    };
  }

  function error ($scope, text) {
    $scope.message = {
      show:  true,
      nivel: 'error',
      text:  text
    };
  }

  return {
    info:   info,
    warn:   warn,
    error:  error
  };
}

factoriesModule.factory('showMessageBuilder', showMessageBuilder);
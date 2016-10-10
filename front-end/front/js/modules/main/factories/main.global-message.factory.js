'use strict';

var factoriesModule = require('./_index');

/**
 * @ngInject
 */
function globalMessage($rootScope) {

  function success(text) {
    $rootScope.globalMessage = {
      show:  true,
      nivel: 'success',
      text:  text
    };
  }

  function info (text) {
    $rootScope.globalMessage = {
      show:  true,
      nivel: 'info',
      text:  text
    };
  }

  function warn (text) {
    $rootScope.globalMessage = {
      show:  true,
      nivel: 'warn',
      text:  text
    };
  }

  function error (text) {
    $rootScope.globalMessage = {
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

factoriesModule.factory('globalMessage', globalMessage);
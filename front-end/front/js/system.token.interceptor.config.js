'use strict';

/**
 * @ngInject
 */
function routerConfig($httpProvider) {
  $httpProvider.interceptors.push('AuthService', function(AuthService) {
    return {
      'request': function (config) {
        config.headers = config.headers || {};
        config.headers.Authorization = AuthService.token();
        return config;
      },
    };
  });
}

module.exports = routerConfig;
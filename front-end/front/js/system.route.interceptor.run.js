'use strict';

/**
 * @ngInject
 */
function run($rootScope, AuthService, $location, SystemUriConfig) {
  $rootScope.$on("$locationChangeStart",function () {

    if ($location.path().lastIndexOf(SystemUriConfig.login) !== -1) {
      $rootScope.showLogin = true;
    } else {
      $rootScope.showLogin = false;
    }
  });
}

module.exports = run;

'use strict';

/**
 * @ngInject
 */
function run($rootScope, AuthService, AcessoService, $location, systemUri) {
  function verifyPermission() {
    if (AuthService.userAuthenticated()) {
      $rootScope.showLogin = false;
    } else {
      $rootScope.showLogin = true;
      $location.path(systemUri.login());
    }
  }
  
  function verifyAccess() {
    if($location.path.startsWith('/gestao-projeto/') && AcessoService.isModoVisaoGeral) {
      $location.path(systemUri.home());
    }
  }

  function init() {
    verifyPermission();
    verifyAccess();
    $rootScope.$on("$locationChangeStart", verifyAccess);
  }

  init();
}

module.exports = run;


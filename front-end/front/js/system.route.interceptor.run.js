'use strict';

/**
 * @ngInject
 */
function run($rootScope, AuthService, $location, systemUri) {
  function verifyPermission() {
    if (AuthService.userAuthenticated()) {
      $rootScope.showLogin = false;
    } else {
      $rootScope.showLogin = true;
      $location.path(systemUri.login());
    }
  }
  
  function verifyAccess() {
    // Verificar acesso as rotas
  }

  function init() {
    verifyPermission();
    verifyAccess();
    $rootScope.$on("$locationChangeStart", verifyAccess);
  }

  init();
}

module.exports = run;


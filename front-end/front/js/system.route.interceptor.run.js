'use strict';

/**
 * @ngInject
 */
function run($rootScope, AuthService, AcessoService, $location, systemUri) {
  function verifyPermission() {
    var path = $location.path();
    if (AuthService.userAuthenticated()) {
      $rootScope.showLogin = false;
    } else {
      $rootScope.showLogin = true;
      
      if(path.startsWith(systemUri.loginAlteracaoSenha(''))) {
        $rootScope.loginAlteracaoSenha = true;
      } else {
        $location.path(systemUri.login());
      }
    }
  }
  
  function verifyAccess() { 
    var path = $location.path(); 
    if(path.startsWith('/gestao-projeto/') && AcessoService.isModoVisaoGeral) {
      //$location.path(systemUri.home());
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


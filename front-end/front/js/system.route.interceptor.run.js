'use strict';

/**
 * @ngInject
 */
function run($rootScope, AuthService, $location) {
  $rootScope.$on("$locationChangeStart",function () {
    /*Todo implementar*/
  });
}

module.exports = run;

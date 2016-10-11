'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function AuthService($window) {
  this.userAuthenticated = function () {
    return angular.isDefined($window.sessionStorage.token);
  };

  this.logout = function () {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.usuario;
  };

  this.token = function () {
    return $window.sessionStorage.token;
  };

  this.storeToken = function (user) {
    $window.sessionStorage.token = user.token;
  };
}

servicesModule.service('AuthService', AuthService);
'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function HomeController($scope, HomeService) {
  function findHomeCb(promisse) {
    promisse.success(function (home) {
      $scope.home = home;
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar');
      console.log(err);
    });
  }
 /* HomeService.findHome(findHomeCb);*/
}

controllersModule.controller('HomeController', HomeController);
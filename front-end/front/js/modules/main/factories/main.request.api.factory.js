'use strict';

var factoriesModule = require('./_index');

/**
 * @ngInject
 */
function requestApiService($http, $location, ApplicationSettings) {
  function requestGetDev (cb, route) {
    var promisse = $http.get('/api/system/uri/api');
    promisse.success(function (uri) {
      cb($http.get(uri + route));
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar recursos de: ' + route);
      console.log(err);
    });
  }

  function requestGetProd (cb, route) {
    var uri = 'http://tg.joaquimsn.com.br/api';
    cb($http.get(uri + route));
  }

  function requestPostDev (cb, data, route) {
    var promisse = $http.get('/api/system/uri/api');
    promisse.success(function (uri) {
      cb($http.post(uri + route, data));
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar recursos de: ' + route);
      console.log(err);
    });
  }

  function requestPostProd (cb, data, route) {
    var uri = 'http://tg.joaquimsn.com.br/api';
    cb($http.post(uri + route, data));
  }

  return {
    get: ($location.$$port === 443 || $location.$$port === 80) ? requestGetProd : requestGetDev,
    post: ($location.$$port === 443 || $location.$$port === 80) ? requestPostProd : requestPostDev
  };
}

factoriesModule.factory('requestApiService', requestApiService);
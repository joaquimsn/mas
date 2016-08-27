'use strict';

var factoriesModule = require('./_index');

/**
 * @ngInject
 */
function requestApiService($http, $location, ApplicationSettings) {
  function requestGetDev (cb, route) {
    var promisse = $http.get('/api/system/uri/api');
    promisse.success(function (uri) {
      console.log(uri);
      cb($http.get(uri + route));
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar recursos de: ' + route);
      console.log(err);
    });
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

   function requestPutDev (cb, data, route) {
    var promisse = $http.get('/api/system/uri/api');
    promisse.success(function (uri) {
      cb($http.put(uri + route, data));
    });
    promisse.error(function (err) {
      console.log('Erro ao buscar recursos de: ' + route);
      console.log(err);
    });
  }

  function requestDelDev (cb, route) {
    var promisse = $http.get('/api/system/uri/api');
    promisse.success(function (uri) {
      cb($http.delete(uri + route));
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

  function requestDelProd (cb, route) {
    var uri = 'http://tg.joaquimsn.com.br/api';
    cb($http.delete(uri + route));
  }

  function requestPostProd (cb, data, route) {
    var uri = 'http://tg.joaquimsn.com.br/api';
    cb($http.post(uri + route, data));
  }

  function requestPutProd (cb, data, route) {
    var uri = 'http://tg.joaquimsn.com.br/api';
    cb($http.put(uri + route, data));
  }

  return {
    get: ($location.$$port === 443 || $location.$$port === 80) ? requestGetProd : requestGetDev,
    post: ($location.$$port === 443 || $location.$$port === 80) ? requestPostProd : requestPostDev,
    put: ($location.$$port === 443 || $location.$$port === 80) ? requestPutProd : requestPutDev,
    del: ($location.$$port === 443 || $location.$$port === 80) ? requestDelProd : requestDelDev
  };
}

factoriesModule.factory('requestApiService', requestApiService);
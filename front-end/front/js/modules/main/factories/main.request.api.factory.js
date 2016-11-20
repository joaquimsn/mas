'use strict';

var factoriesModule = require('./_index');

/**
 * @ngInject
 */
function requestApiService($http, $location, $log, ApplicationSettings) {
  function requestGetDev (cb, route) {
    var promise = $http.get('/api/system/uri/api');
    promise.success(function (uri) {
      console.log(uri);
      cb($http.get(uri + route));
    });
    promise.error(function (err) {
      console.log('Erro ao buscar recursos de: ' + route);
      console.log(err);
    });
  }

  function requestPostDev (cb, data, route) {
    var promise = $http.get('/api/system/uri/api');
    promise.success(function (uri) {
      cb($http.post(uri + route, data));
    });
    promise.error(function (err) {
      console.log('Erro ao buscar recursos de: ' + route);
      console.log(err);
    });
  }

   function requestPutDev (cb, data, route) {
    var promise = $http.get('/api/system/uri/api');
    promise.success(function (uri) {
      cb($http.put(uri + route, data));
    });
    promise.error(function (err) {
      console.log('Erro ao buscar recursos de: ' + route);
      console.log(err);
    });
  }

  function requestDelDev (cb, route) {
    var promise = $http.get('/api/system/uri/api');
    promise.success(function (uri) {
      cb($http.delete(uri + route));
    });
    promise.error(function (err) {
      console.log('Erro ao buscar recursos de: ' + route);
      console.log(err);
    });
  }

   function requestGetProd (cb, route) {
    var uri = 'http://35.160.139.101:4100/';
    cb($http.get(uri + route));
  }

  function requestDelProd (cb, route) {
    var uri = 'http://35.160.139.101:4100/';
    cb($http.delete(uri + route));
  }

  function requestPostProd (cb, data, route) {
    var uri = 'http://35.160.139.101:4100/';
    cb($http.post(uri + route, data));
  }

  function requestPutProd (cb, data, route) {
    var uri = 'http://35.160.139.101:4100/';
    cb($http.put(uri + route, data));
  }

  // Request sem retorno de promise
  function requestGetDevNoReturn (cb, route) {
    function exectRequest (uri) {
      return $http.get(uri.data + route);
    }

    var promise = $http.get('/api/system/uri/api');
    promise.then()
    .then(exectRequest)
    .then(function(retorno) {
      cb(retorno.data);
    })
    .catch($log.error);
  }

  function requestGetProdNoReturn (cb, route) {
    var uri = 'http://35.160.139.101:4100/';

    var promise = $http.get(uri + route);
    promise.then()
    .then(function(retorno) {
      cb(retorno.data);
    })
    .catch($log.error);
  }
  
  function requestPostDevNoReturn (cb, data, route) {
    function exectRequest (uri) {
      return $http.post(uri.data + route, data);
    }
    
    var promise = $http.get('/api/system/uri/api');
    promise.then()
    .then(exectRequest)
    .then(function(retorno) {
      cb(retorno.data);
    })
    .catch($log.error);
  }

  function requestPostProdNoReturn (cb, data, route) {
    var uri = 'http://35.160.139.101:4100/';

    var promise = $http.post(uri + route, data);
    promise.then()
    .then(function(retorno) {
      cb(retorno.data);
    })
    .catch($log.error);
  }

  function requestPutDevNoReturn (cb, data, route) {
    function exectRequest (uri) {
      return $http.put(uri.data + route, data);
    }
    
    var promise = $http.get('/api/system/uri/api');
    promise.then()
    .then(exectRequest)
    .then(function(retorno) {
      cb(retorno.data);
    })
    .catch($log.error);
  }

  function requestPutProdNoReturn (cb, data, route) {
    var uri = 'http://35.160.139.101:4100/';

    var promise = $http.put(uri + route, data);
    promise.then()
    .then(function(retorno) {
      cb(retorno.data);
    })
    .catch($log.error);
  }

  function requestdelDevNoReturn (cb, route) {
    function exectRequest (uri) {
      return $http.put($http.delete(uri.data + route));
    }

    var promise = $http.get('/api/system/uri/api');
    promise.then()
    .then(exectRequest)
    .then(function(retorno) {
      cb(retorno.data);
    })
    .catch($log.error);
  }

   function requestdelProdNoReturn (cb, route) {
    var uri = 'http://35.160.139.101:4100/';

    var promise = $http.delete(uri + route);
    promise.then()
    .then(function(retorno) {
      cb(retorno.data);
    })
    .catch($log.error);
  }

  return {
    get: ($location.$$port === 443 || $location.$$port === 80) ? requestGetProd : requestGetDev,
    post: ($location.$$port === 443 || $location.$$port === 80) ? requestPostProd : requestPostDev,
    put: ($location.$$port === 443 || $location.$$port === 80) ? requestPutProd : requestPutDev,
    del: ($location.$$port === 443 || $location.$$port === 80) ? requestDelProd : requestDelDev,
    getNo: ($location.$$port === 443 || $location.$$port === 80) ? requestGetProdNoReturn : requestGetDevNoReturn,
    postNo: ($location.$$port === 443 || $location.$$port === 80) ? requestPostProdNoReturn : requestPostDevNoReturn,
    putNo: ($location.$$port === 443 || $location.$$port === 80) ? requestPutProdNoReturn : requestPutDevNoReturn,
    delNo: ($location.$$port === 443 || $location.$$port === 80) ? requestdelProdNoReturn : requestdelDevNoReturn
  };
}

factoriesModule.factory('requestApiService', requestApiService);
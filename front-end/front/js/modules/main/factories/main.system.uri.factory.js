'use strict';

var factoriesModule = require('./_index');

function systemUri(SystemUriConfig) {
  return {
    home: function () {
      return SystemUriConfig.home;
    },
    courses: function (core, path) {
      return SystemUriConfig.courses.replace(':core', core).replace(':path', path);
    },
    coursesCategory: function (core) {
      return SystemUriConfig.coursesCategory.replace(':core', (core) ? core : 'nucleo-educacao');
    },
    courseDetailing: function (core, path) {
      return SystemUriConfig.courseDetailing.replace(':core', core).replace(':path', path);
    },
    modulo: function () {
      return SystemUriConfig.modulo;
    },
    kanban: function () {
      return SystemUriConfig.kanban;
    },
    notFound: function () {
      return SystemUriConfig.notFound;
    }
  };
}

factoriesModule.factory('systemUri', systemUri);
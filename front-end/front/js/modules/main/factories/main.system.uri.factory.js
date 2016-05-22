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
    aboutUs: function () {
      return SystemUriConfig.aboutUs;
    },
    cores: function () {
      return SystemUriConfig.cores;
    },
    partners: function () {
      return SystemUriConfig.partners;
    },
    teachers: function () {
      return SystemUriConfig.teachers;
    },
    contact: function () {
      return SystemUriConfig.contact;
    },
    register: function () {
      return SystemUriConfig.register;
    },
    sigin: function () {
      return SystemUriConfig.sigin;
    },
    forgetPassword: function () {
      return SystemUriConfig.forgetPassword;
    },
    resetPassword: function (token) {
      return SystemUriConfig.resetPassword.replace(':token', token);
    },
    myCourses: function () {
      return SystemUriConfig.myCourses;
    },
    myAccount: function () {
      return SystemUriConfig.myAccount;
    },
    checkout: function () {
      return SystemUriConfig.checkout;
    },
    payment: function (idordem) {
      return SystemUriConfig.payment.replace(':idordem', idordem);
    },
    notFound: function () {
      return SystemUriConfig.notFound;
    }
  };
}

factoriesModule.factory('systemUri', systemUri);
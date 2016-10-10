'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function EmailService($http, requestEmailApiService, emailBuilder) {
  this.sendRegisterConfirmation = function (cb, user) {
    requestEmailApiService.post(cb, emailBuilder.buildRegisterConfirmation(user), '/email');
  };

  this.sendVerificationCode = function (cb, user, code) {
    requestEmailApiService.post(cb, emailBuilder.buildSendVerificationCode(user, code), '/email');
  };

  this.sendContact = function (body, cb) {
    requestEmailApiService.post(cb, emailBuilder.buildContact(body), '/email');
  };

  this.sendUserChange = function (user, cb) {
    requestEmailApiService.post(cb, emailBuilder.buildUserChange(user), '/email');
  };
}

servicesModule.service('EmailService', EmailService);
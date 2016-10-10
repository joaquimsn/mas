'use strict';

var factoriesModule = require('./_index');

/**
 * @ngInject
 */
function emailBuilder() {

  function buildRegisterConfirmation(conta) {
    return {
      "config":         "default",
      "templateName":   "register",
      "to":             conta.email,
      "subject":        "Confirmação de cadastro",
      "templateParams": {
        "name":     conta.nome,
        "email":    conta.email
      }
    };
  }

  function buildSendVerificationCode(conta, verificationCode) {
    return {
      "config":         "default",
      "templateName":   "register-verification",
      "to":             conta.email,
      "subject":        "Validação cadastro",
      "templateParams": {
        "name":     conta.nome,
        "email":    conta.email,
        "message":  verificationCode
      }
    };
  }

  function buildUserChange(conta) {
    return {
      "config":         "default",
      "templateName":   "change-account",
      "to":             conta.email,
      "subject":        "Alteração de informações",
      "templateParams": {
        "name":     conta.nome,
        "email":    conta.email
      }
    };
  }

  return {
    buildRegisterConfirmation: buildRegisterConfirmation,
    buildUserChange: buildUserChange,
    buildSendVerificationCode: buildSendVerificationCode
  };
}

factoriesModule.factory('emailBuilder', emailBuilder);
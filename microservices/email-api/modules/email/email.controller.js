(function () {
  'use strict';
  var Service = require('./email.service');

  function sendEmail (req, res) {
    Service.sendEmail(req, res);
  }

  var controller = {
    sendEmail: sendEmail
  };
  module.exports = controller;
}());
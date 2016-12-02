(function() {
    'use strict';
    var Service = require('./git.service');

    function cadastrarIssue(req, res) {
        Service.cadastrarIssue(req, res);
    }
    
    function cadastrarHook(req, res) {
        Service.cadastrarHook(req, res);
    }

    function fecharTarefa(req, res) {
        Service.fecharTarefa(req, res);
    }


    var controller = {
        cadastrarIssue: cadastrarIssue,
        fecharTarefa: fecharTarefa, 
        cadastrarHook: cadastrarHook
    };

    module.exports = controller;
}());
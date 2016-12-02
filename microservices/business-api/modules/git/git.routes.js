module.exports = function(server) {
    'use strict';
    var controller = require('./git.controller');

    server.post('/github/hooks', controller.cadastrarHook);
    server.post('/github/hooks/:idModulo', controller.fecharTarefa);

    server.post('/github/issue', controller.cadastrarIssue);
};
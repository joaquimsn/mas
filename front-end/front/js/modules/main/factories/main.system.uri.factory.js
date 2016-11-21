'use strict';

var factoriesModule = require('./_index');

function systemUri(SystemUriConfig) {
    return {
        login: function() {
            return SystemUriConfig.login;
        },
        loginAlteracaoSenha: function(id) {
            return SystemUriConfig.loginAlteracaoSenha.replace(':id', id);
        },
        home: function() {
            return SystemUriConfig.home;
        },
        funcionalidade: function() {
            return SystemUriConfig.funcionalidade;
        },
        modulo: function() {
            return SystemUriConfig.gestaoProjetoModulo;
        },
        moduloCadastro: function() {
            return SystemUriConfig.gestaoProjetoModuloCadastro;
        },
        moduloAlteracao: function(id) {
            return SystemUriConfig.gestaoProjetoModuloAlteracao.replace(':id', id);
        },
        tarefaFuncionalidade: function() {
            return SystemUriConfig.gestaoProjetoTarefaFuncionalidade;
        },
        tarefaFuncionalidadeCadastro: function() {
            return SystemUriConfig.gestaoProjetoTarefaFuncionalidadeCadastro;
        },
        tarefaFuncionalidadeAlteracao: function(id) {
            return SystemUriConfig.gestaoProjetoTarefaFuncionalidadeAlteracao.replace(':id', id);
        },
        projeto: function() {
            return SystemUriConfig.projeto;
        },
        equipe: function() {
            return SystemUriConfig.equipe;
        },
        projetoCadastro: function() {
            return SystemUriConfig.projetoCadastro;
        },
        projetoAlteracao: function(id) {
            return SystemUriConfig.projetoAlteracao.replace(':id', id);
        },
        kanban: function() {
            return SystemUriConfig.gestaoProjetoKanbanModulo;
        },
        dashboard: function() {
            return SystemUriConfig.gestaoProjetoDashboard;
        },
        notFound: function() {
            return SystemUriConfig.notFound;
        }
    };
}

factoriesModule.factory('systemUri', systemUri);
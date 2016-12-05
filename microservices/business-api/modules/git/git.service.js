(function() {
    'use strict';
    var request = require('request');

    var ModuloService = require('./../modulos/modulos.service');
    var FuncionalidadeService = require('./../funcionalidade/funcionalidade.service');
    var KanbanService = require('./../kanban/kanban.service');

    /**
     * Move a tarefa para seção final do kanban, removendo a da sua seção 
     * atual
     * 
    */
    function _atualizarSecaoKanban(kanban, tarefa) {
        var secoes = kanban.secoes;
        var secaoFinal;

        // remover secao atual
        for (var i = 0; i < secoes.length; i++) {
            if (secoes[i].estadoFinal) {
                secaoFinal = secoes[i];
            } else {

                var encontrou = false;
                var funcionalidades = secoes[i].funcionalidades;

                // Busca em todas as seções do kanban, pela tarefa que foi fechada no github
                for (var j = 0; j < funcionalidades.length && !encontrou; j++) {
                    if (funcionalidades[j] == tarefa._id + '') {
                        KanbanService.removerFuncionalidadeSecaoLocal(kanban._id, secoes[i]._id, tarefa._id);
                        console.log(':::::::::: achou ::::::::::::::::::');
                        encontrou = true;
                        break;
                    }
                }
            }
        }

        //Adiciona a tarefa para seção final do kanban
        KanbanService.adicionarFuncionalidadeSecaoLocal(kanban._id, secaoFinal._id, tarefa);
        console.log('git: Kanban para fechar tarefa', kanban);
    }

    /**
     * Responsável por fechar a tarefa, a partir da issue cadastrada no github
     */
    function fecharTarefa(req, res) {
        var idModulo = req.params.idModulo;
        var webhook = req.body;
        console.log('webhook recebido');

        function fecharTarefaKanban(modulo) {
            for (var i = 0; i < modulo.tarefas.length; i++) {
                var tarefa = modulo.tarefas[i];
                if (tarefa.idIssue == webhook.issue.id) {
                    FuncionalidadeService.fecharTarefaLocal(tarefa);
                    _atualizarSecaoKanban(modulo.kanban, tarefa);
                    break;
                }
            }

            res.json({ mensagem: 'tarefaAtualizada com sucesso' });
        }


        if (webhook.action === 'closed') {
            ModuloService.buscarPorIdLocal(fecharTarefaKanban, idModulo);
        } else {
            res.json({ mensagem: 'não encontrado, status tratado apenas closed' });
        }
    }

    /**
     * Faz uma replica da tarefa cadastrada para o github, 
     * vinculando o cadastro no github a tarefa do sistema 
     */
    function cadastrarIssue(req, res) {
        console.log('cadastrando issue', req.body);
        var tarefa = req.body.tarefa;
        var gitUser = req.body.gitUser;

        var issue = {
            title: tarefa.titulo,
            body: tarefa.descricao
        };

        var options = {
            uri: 'https://api.github.com/repos/' + gitUser.name + '/' + gitUser.repo + '/issues',
            method: 'POST',
            auth: { user: gitUser.name, pass: gitUser.pass },
            json: true,
            headers: {
                "content-type": "application/json",
                "User-Agent": "Awesome-Octocat-App"
            },
            body: issue
        };

        request(options, function(error, response, body) {
            if (!error && response.statusCode == 201) {
                console.log("Issue cadastrada no github", body);
                FuncionalidadeService.adicionarIssue(tarefa, body);
                res.json(body);
            } else {
                res.status(500);
                res.json(response);
            }
        });
    }

    /**
     * Cadastra a url para recebimento do notificações do github
     */
    function cadastrarHook(req, res) {
        console.log('cadastrando hook', req.body);
        var modulo = req.body.modulo;
        var gitUser = req.body.gitUser;

        var hook = {
            name: 'web',
            active: true,
            events: ["issues"],
            config: {
                url: "http://35.160.139.101:4100/github/hooks/" + modulo._id,
                content_type: "application/json"
            }
        };

        var options = {
            uri: 'https://api.github.com/repos/' + gitUser.name + '/' + gitUser.repo + '/hooks',
            method: 'POST',
            auth: { user: gitUser.name, pass: gitUser.pass },
            json: true,
            headers: {
                "content-type": "application/json",
                "User-Agent": "Awesome-Octocat-App"
            },
            body: hook
        };

        request(options, function(error, response, body) {
            if (!error && response.statusCode == 201) {
                console.log("Hook cadastrado no github", body);
                // Registrarhook
                res.json(body);
            } else {
                res.status(500);
                res.json(response);
            }
        });
    }

    var service = {
        cadastrarIssue: cadastrarIssue,
        fecharTarefa: fecharTarefa,
        cadastrarHook: cadastrarHook,
    };

    module.exports = service;
}());
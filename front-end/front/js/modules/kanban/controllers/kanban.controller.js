'use strict';

var controllersModule = require('./_index');

var umDiaMs = 1000 * 60 * 60 * 24;

function intervaloDias(dataIncio, dataTermino) {
    var dataInicioMs = dataIncio.getTime();
    var dataTerminoMs = dataTermino.getTime();

    var diferenca = dataTerminoMs - dataInicioMs;

    return Math.round(diferenca / umDiaMs);
}

function _acaoFuncionalidadeMovida(FuncionalidadeService, funcionalidade, mensagem) {
    var acao = 'Movida';
    var evento = {
        acao: acao,
        descricao: mensagem
    };

    FuncionalidadeService.registrarEvento(evento, funcionalidade);
}

function _acaoFuncionalidadePriorizada(FuncionalidadeService, funcionalidade, mensagem) {
    var acao = 'Prioridade alterada';
    var evento = {
        acao: acao,
        descricao: mensagem
    };

    FuncionalidadeService.registrarEvento(evento, funcionalidade);
}

/**
 * @ngInject
 */
function KanbanController($scope, KanbanService, SessaoService, FuncionalidadeService, ngDialog, $mdDialog, orderByFilter) {
    $scope.novaSecao = { nome: '' };
    $scope.moduloFiltroSelecionado;

    $scope.moduloKanbanSelecionado = SessaoService.getModulo();

    function buscarModuloCb(promisse) {
        promisse.success(function(modulos) {
            $scope.modulosFiltro = modulos;
        });
        promisse.error(function(err) {
            console.log('Erro ao buscar modulos');
        });
    }

    function buscarKanbanCb(promisse) {
        promisse.success(function(kanban) {
            kanban.secoes = orderByFilter(kanban.secoes, 'ordem');
            $scope.kanban = kanban;
        });
        promisse.error(function(err) {
            console.log('Erro ao buscar');
            console.log(err);
        });
    }

    function cadastrarSecaoCb(promise) {
        promise.success(function(secao) {
            KanbanService.addSection($scope.kanban, secao);
            $scope.novaSecao = { nome: '' };
        });
        promise.error(function(err) {
            console.error(err);
        });
    }

    function adicionarNovaSecao(kanban, secao) {
        secao.ordem = kanban.secoes.length;
        KanbanService.cadastrarSecao(cadastrarSecaoCb, kanban, secao);
    }

    $scope.adicionarNovaSecao = adicionarNovaSecao;

    $scope.alterarSecao = function(secao) {
        secao.editarToggle = !secao.editarToggle;
        KanbanService.alterarSecao(function() {}, secao, $scope.kanban);
    };

    function ordernarSecoes(secoes, posicaoStartOrdenacao) {
        var kanban = $scope.kanban;
        for (var index = posicaoStartOrdenacao; index < secoes.length; index++) {
            var secao = secoes[index];
            console.log(secao);
            secao.ordem = index;
            KanbanService.alterarSecao(function() {}, secao, kanban);
        }
    }

    $scope.secoesSortOptions = {
        containment: '#kanaban-secoes',
        accept: function(sourceItemHandleScope, destSortableScope) {
            //console.log(sourceItemHandleScope);
            //console.log(destSortableScope);
            return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
        },
        itemMoved: function(event) {
            // console.log("Secao movida");
            console.log(event);
            //event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent;

            //console.log(event.dest.sortableScope.$parent.section);
        },
        orderChanged: function(event) {
            console.log("orderChange");
            console.log(event);
            var secoes = event.dest.sortableScope.modelValue;
            var novaPosicao = event.dest.index;
            var antigaPosicao = event.source.index;

            if (novaPosicao < antigaPosicao) {
                ordernarSecoes(secoes, novaPosicao);
            } else {
                ordernarSecoes(secoes, antigaPosicao);
            }
        }
    };

    function ordernarFuncionalidades(funcionalidades, posicaoStartOrdenacao) {
        for (var index = posicaoStartOrdenacao; index < funcionalidades.length; index++) {
            var funcionalidade = funcionalidades[index];
            console.log(funcionalidade);
            funcionalidade.ordem = index;
            FuncionalidadeService.alterar(function() {}, funcionalidade);
        }
    }

    $scope.funcionalidadeSortOptions = {
        itemMoved: function(event) {
            console.log("Funcionalidade Movida");
            event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.section.nome;

            var funcionalidade = event.source.itemScope.modelValue;
            var secaoAnterior = event.source.sortableScope.$parent.section;
            // Remove da seção anterior na base
            KanbanService.removerFuncionalidadeSecao(funcionalidade, $scope.kanban, secaoAnterior);

            // Adiciona para a nova secao
            var secaoNova = event.dest.sortableScope.$parent.section;
            KanbanService.adicionarFuncionalidadeSecao(funcionalidade, $scope.kanban, secaoNova);

            // Ordena a funcionalidades na nova secao
            var funcionalidades = event.dest.sortableScope.modelValue;
            var novaPosicao = event.dest.index;
            ordernarFuncionalidades(funcionalidades, novaPosicao);

            // Registro de evento para o historico
            var mensagem = 'Funcionalidade movida da seção ' + secaoAnterior.nome +
                ' para ' + secaoNova.nome;
            _acaoFuncionalidadeMovida(FuncionalidadeService, funcionalidade, mensagem);
        },
        orderChanged: function(event) {
            console.log("orderChange");

            var funcionalidades = event.dest.sortableScope.modelValue;
            var novaPosicao = event.dest.index;
            var antigaPosicao = event.source.index;

            if (novaPosicao < antigaPosicao) {
                ordernarFuncionalidades(funcionalidades, novaPosicao);
            } else {
                ordernarFuncionalidades(funcionalidades, antigaPosicao);
            }

            // registro evento de repriorização
            var funcionalidade = event.source.itemScope.modelValue;
            var mensagem = 'A prioridade foi alterada de ' + antigaPosicao + ' para ' + novaPosicao + ' na seção ' + funcionalidade.status;

            _acaoFuncionalidadePriorizada(FuncionalidadeService, funcionalidade, mensagem);
        }
    };

    $scope.removeTask = function(task) {
        KanbanService.removeTask($scope.kanban, $scope.sectionSelecionada, task);
    };

    function addNewTask(task) {
        console.log(task);
        KanbanService.addNewTask($scope.kanban, $scope.sectionSelecionada, task);
    }

    $scope.addNewTask = addNewTask;

    $scope.orderBy = function(list, field) {
        list = orderByFilter(list, field);
    };

    $scope.removeSection = function(section, event) {
        if (section.estadoFinal) {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#kanaban-secoes')))
                .clickOutsideToClose(true)
                .title('Atenção')
                .textContent('Não é possível excluir a seção final, apenas alterar seu nome. Importante independente da ordem definida essa seção sempre é a final.')
                .ariaLabel('Dialog')
                .ok('Ok!')
                .targetEvent(event)
            );
        } else if (section.funcionalidades && section.funcionalidades.length === 0) {
            KanbanService.removeSection($scope.kanban, section);
        } else {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#kanaban-secoes')))
                .clickOutsideToClose(true)
                .title('Atenção')
                .textContent('Para excluir uma seção é necessário que ela esteja vazia.')
                .ariaLabel('Dialog')
                .ok('Ok!')
                .targetEvent(event)
            );
        }
    };

    $scope.openModalTask = function(section) {
        $scope.sectionSelecionada = section;
        ngDialog.open({
            template: 'partials/kanban/funcionalidade',
            scope: $scope,
            width: '80%'
        });
    };

    $scope.abrirModalCadastroFuncionalidade = function(ev, sectionSelecionada) {
        $mdDialog.show({
                controller: 'FuncionalidadeCadastroController',
                templateUrl: 'partials/kanban/funcionalidade',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                preserveScope: true,
                scope: $scope,
                locals: { section: sectionSelecionada },
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
            .then(function(retorno) {
                // fallback
            }, function() {
                // Modal fechado
            });
    };

    $scope.abrirModalEdicaoFuncionalidade = function(ev, funcionalidade) {
        $mdDialog.show({
                controller: 'FuncionalidadeEdicaoController',
                templateUrl: 'partials/kanban/funcionalidade',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                preserveScope: true,
                scope: $scope,
                locals: { funcionalidade: funcionalidade },
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
            .then(function(retorno) {
                // fallback
            }, function() {
                // Modal fechado
            });
    };

    $scope.closeModalCadastroFuncionalidade = function() {
        $mdDialog.cancel();
    };

    $scope.abrirModalCadastroSecao = function(ev) {
        var confirm = $mdDialog.prompt()
            .title('Criar seção')
            .textContent('Informe o nome para seção.')
            .placeholder('Nome para seção')
            .targetEvent(ev)
            .ok('Criar')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(function(result) {
            var secao = { nome: result };
            adicionarNovaSecao($scope.kanban, secao);
        }, function() {
            // Lançar mensagem de cancelamento
        });
    };

    KanbanService.findKanban(buscarKanbanCb);
    //SessaoService.findModulos(buscarModuloCb);

    // status tag
    $scope.verificarStatusTask = function(task) {
      if(task.dataFim()) {
        var diferenca = intervaloDias(new Date(), new Date(task.dataFim));

        if (diferenca < 0) {
          return '-vencida';
        }
        else if (diferenca <= 1) {
          return '-paravencer ';
        } 
        else {
          return '';
        }
      } 
    };

    $scope.moduloKanbanSelecionado = SessaoService.getModulo();
}

controllersModule.controller('KanbanController', KanbanController);
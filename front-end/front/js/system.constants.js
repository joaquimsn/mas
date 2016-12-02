'use strict';

var SystemUrlConfig = {
  login: '/login',
  loginAlteracaoSenha: '/login/alteracao/:id',
  home: '/',
  projeto: '/projetos',
  projetoCadastro: '/projeto/cadastro',
  projetoAlteracao: '/projeto/alteracao/:id',
  equipe: '/equipes',
  dashboard: '/dashboard',
  configuracao: 'configuracao',
  gestaoProjetoDashboard: '/gestao-projeto/dashboard',
  gestaoProjetoKanbanModulo: '/gestao-projeto/kanban-modulo',
  gestaoProjetoKanbanFuncionalidade: '/gestao-projeto/kanban-funcionalidade',
  gestaoProjetoModulo: '/gestao-projeto/modulos',
  gestaoProjetoModuloCadastro: '/gestao-projeto/modulo/cadastro',
  gestaoProjetoModuloAlteracao: '/gestao-projeto/modulo/alteracao/:id',
  gestaoProjetoTag: '/gestao-projeto/tags',
  gestaoProjetoTarefaFuncionalidade: '/gestao-projeto/funcionalidade',
  gestaoProjetoTarefaFuncionalidadeCadastro: '/gestao-projeto/funcionalidade/cadastro',
  gestaoProjetoTarefaFuncionalidadeAlteracao: '/gestao-projeto/funcionalidade/alteracao/:id',
  notFound: '/404'
};

module.exports = SystemUrlConfig;
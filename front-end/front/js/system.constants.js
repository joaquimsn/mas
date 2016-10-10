'use strict';

var SystemUrlConfig = {
  login: '/login',
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
  gestaoProjetoModuloAlteracao: '/gestao-projeto/modulo/alteracao/:idModulo',
  gestaoProjetoTag: '/gestao-projeto/tags',
  gestaoProjetoFuncionalidade: '/gestao-projeto/funcionalidade',
  gestaoProjetoFuncionalidadeCadastro: '/gestao-projeto/funcionalidade/cadastro',
  gestaoProjetoFuncionalidadeAlteracao: '/gestao-projeto/funcionalidade/alteracao/:id',
  notFound: '/404'
};

module.exports = SystemUrlConfig;
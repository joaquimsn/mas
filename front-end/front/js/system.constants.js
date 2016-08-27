'use strict';

var SystemUrlConfig = {
  login: '/login',
  home:             '/',
  kanban:          '/kanban',
  modulo:  '/modulo',
  moduloCadastro:  '/modulo/cadastro',
  moduloAlteracao:  '/modulo/:idModulo',
  funcionalidade:  '/funcionalidade',
  funcionalidadeAlteracao:  '/funcionalidade/:id',
  notFound:         '/404'
};

module.exports = SystemUrlConfig;
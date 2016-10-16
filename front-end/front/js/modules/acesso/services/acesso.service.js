'use strict';

var servicesModule      = require('./_index');

function menusGeral() {
  return [
    {
      nome: 'Inicio',
      url: '/',
      icon: 'icon-home',
      submenus: []
    },
    {
      nome: 'Projetos',
      url: '/projetos',
      icon: 'icon-projeto',
      submenus: []
    },
    {
      nome: 'Equipes',
      url: '/equipes',
      icon: 'icon-share',
      submenus: []
    }/*,
    {
      nome: 'Configurações',
      url: '/configuracoes',
      icon: 'icon-build',
      submenus: []
    }*/
  ];
}

function menusProjeto() {
  return [
    {
      nome: 'Inicio',
      url: '/',
      icon: 'icon-home',
      submenus: []
    },
    /*{
      nome: 'Dashboard',
      url: '/gestao-projeto/dashboard',
      icon: 'icon-dashboard',
      submenus: []
    },*/
    {
      nome: 'Kanban',
      url: '/gestao-projeto/kanban-modulo',
      icon: 'icon-kanban',
      submenus: []
    },
    {
      nome: 'Modulos',
      url: '/gestao-projeto/modulos',
      icon: 'icon-modulos',
      submenus: []
    }
    /*{
      nome: 'Tags',
      url: '/gestao-projeto/tags',
      icon: 'icon-tag',
      submenus: []
    }*/
  ];
}

/**
 * @ngInject
 */
function AcessoService(SessaoService) {
  this.menusVisaoGeral = function(callback) {
    callback(menusGeral());
  };

  this.menusVisaoProjeto = function(callback) {
    callback(menusProjeto());
  };

  this.salvarModoVisao = function(modo) {
    SessaoService.storeModoVisao(modo);
  };

  this.isModoVisaoGeral = function(){
    return SessaoService.getModoVisao().tipo === 'geral';
  };

  this.isModoVisaoProjeto = function(){
    return SessaoService.getModoVisao().tipo === 'projeto';
  };

  function init() {
    SessaoService.storeModoVisao({tipo: 'geral'});
  }

  init();
}

servicesModule.service('AcessoService', AcessoService);
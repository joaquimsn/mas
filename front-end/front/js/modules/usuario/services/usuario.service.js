'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function UsuarioService(requestApiService) {
  this.buscarUsuarioDisponivelParaProjeto = function(cb) {
    //requestApiService.get(cb, '/modulos');
    var usuarios = [
      {id: 1, nome: 'Joaquim Neto', email:'teste@email.xom', imagem:'/build/images/default/user.png'},
      {id: 11, nome: 'Vinicius', email:'teste@email.xom', imagem: '/build/images/default/user.png'},
      {id: 15, nome: 'Marcos Santana', email:'teste@email.xom', imagem: '/build/images/default/user.png'},
      {id: 13, nome: 'Marcos Paulo', email:'teste@email.xom', imagem: '/build/images/default/user.png'},
      {id: 14, nome: 'Andre Luiz', email:'teste@email.xom', imagem: '/build/images/default/user.png'},
      {id: 16, nome: 'Kathleen Ramos', email:'teste@email.xom', imagem: '/build/images/default/user.png'}
    ];

    cb(usuarios);
  };
}

servicesModule.service('UsuarioService', UsuarioService);
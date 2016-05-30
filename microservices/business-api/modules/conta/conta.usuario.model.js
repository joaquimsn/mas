'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    usuarioSchema = require('./conta.usuario.schema');

var UsuarioSchema = new Schema(usuarioSchema);

module.exports = mongoose.model('Usuarios', UsuarioSchema);
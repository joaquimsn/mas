'use strict';
var mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    bcrypt          = require('bcrypt-nodejs'),
    usuarioSchema   = require('./conta.usuario.schema');

var UsuarioSchema = new Schema(usuarioSchema);

UsuarioSchema.methods.comparePassword = function (candidatePassword, cb) {
  var Conta = this;
  bcrypt.compare(candidatePassword, Conta.senha, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('Usuarios', UsuarioSchema);
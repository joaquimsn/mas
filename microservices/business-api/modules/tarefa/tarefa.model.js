'use strict';

var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    tarefaSchema    = require('./tarefa.schema');

var TarefaSchema = new Schema(tarefaSchema);

module.exports = mongoose.model('Tarefas', TarefaSchema);
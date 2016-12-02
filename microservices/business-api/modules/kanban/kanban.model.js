'use strict';

var mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    kanbanSchema    = require('./kanban.schema');

var KanbanSchema = new Schema(kanbanSchema);

module.exports = mongoose.model('Kanbans', KanbanSchema);
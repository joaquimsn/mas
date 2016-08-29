'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    moduloSchema = require('./tag.schema');

var Tag = new Schema(moduloSchema);

module.exports = mongoose.model('Tag', Tag);
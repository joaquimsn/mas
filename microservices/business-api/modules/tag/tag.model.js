'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    tagSchema = require('./tag.schema');

var Tag = new Schema(tagSchema);

module.exports = mongoose.model('Tag', Tag);
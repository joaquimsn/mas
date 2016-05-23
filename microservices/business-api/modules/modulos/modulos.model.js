'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var ModuloSchema = new Schema({
  pagePhrase:        {type: String, required: true, default: ''},
  pageImageBanner:    {type: String, required: true, default: ''},
  missionTitle:       {type: String, required: true, default: ''},
  missionDescription: {type: String, required: true, default: ''},
  occupationArea: [
    {
      name:           {type: String, required: true, default: ''},
      areas: [
        {
          name:       {type: String, required: true, default: ''}
        }
      ]
    }
  ],
  contributors: [
    {
      name:           {type: String, required: true, default: ''},
      image:          {type: String, required: true, default: ''},
      description:    {type: String, required: true, default: ''}
    }
  ]
});

module.exports = mongoose.model('Modulos', ModuloSchema);
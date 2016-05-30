'use strict';

module.exports = {
  nome:           {type: String, required: true, min: 3, max: 200},
  email:          {type: String, min: 6, max: 128}
};
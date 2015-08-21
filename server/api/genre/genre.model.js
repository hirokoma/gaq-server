'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GenreSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Genre', GenreSchema);

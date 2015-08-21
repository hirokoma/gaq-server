'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
  title: String,
  genres: [{type: String}],
  description: String,
  image: String
});

module.exports = mongoose.model('Game', GameSchema);

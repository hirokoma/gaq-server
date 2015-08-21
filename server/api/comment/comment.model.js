'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  text: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  question: {type: Schema.Types.ObjectId, ref: 'Question'},
  answer: {type: Schema.Types.ObjectId, ref: 'Answer'},
  reportCount: {type: Number, default: 0},
  time: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', CommentSchema);

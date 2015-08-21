'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  game: {type: Schema.Types.ObjectId, ref: 'Game', required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  recentComments: {
    type: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
  },
  answerCount: {type: Number, default: 0},
  commentCount: {type: Number, default: 0},
  reportCount: {type: Number, default: 0},
  bestAnswer: {type: Schema.Types.ObjectId, ref: 'Answer'},
  time: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Question', QuestionSchema);

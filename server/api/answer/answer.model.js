'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  text: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  question: {type: Schema.Types.ObjectId, ref: 'Question', required: true},
  recentComments: {
    type: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
  },
  likeCount: {type: Number, default: 0},
  commentCount: {type: Number, default: 0},
  reportCount: {type: Number, default: 0},
  isBest: {type: Boolean, default: false},
  time: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Answer', AnswerSchema);

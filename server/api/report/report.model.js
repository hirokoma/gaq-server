'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReportSchema = new Schema({
  text: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  question: {type: Schema.Types.ObjectId, ref: 'Question'},
  answer: {type: Schema.Types.ObjectId, ref: 'Answer'},
  comment: {type: Schema.Types.ObjectId, ref: 'Comment'},
  time: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Report', ReportSchema);

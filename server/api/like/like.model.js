'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LikeSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  answer: {type: Schema.Types.ObjectId, ref: 'Answer', required: true},
  time: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Like', LikeSchema);

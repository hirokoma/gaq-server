'use strict';

var _ = require('lodash');
var Like = require('./like.model');
var Answer = require('./../answer/answer.model');
var dater = require('./../../components/dater/dater.js');

// Creates a new like in the DB.
exports.create = function(req, res) {
  var docs = {
    user: req.user._id,
    answer: req.answers && req.answers.length === 1 ? req.answers[0]._id : null
  };

  function answerFindOneAndUpdateCallback(err, like){
    var formatted = {
      like: {
        id: like._id,
        time: dater.format(like.time),
        user: {
          id: req.user._id,
          name: req.user.name
        },
        answer: {
          id: like.answer
        }
      }
    };
    res.json(201, formatted);
  }

  function likeCreateCallback(err, like){
    if(err) { return handleError(res, err); }
    Answer.findOneAndUpdate(
      {_id: like.answer},
      {$inc: {likeCount: 1} },
      function(err){ answerFindOneAndUpdateCallback(err, like); }
    );
  }

  Like.create(docs, likeCreateCallback);
};

function handleError(res, err) {
  return res.send(500, err);
}

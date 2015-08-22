'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');
var Question = require('./../question/question.model');
var Answer = require('./../answer/answer.model');
var dater = require('./../../components/dater/dater.js');


// Get list of comments
exports.index = function(req, res) {
  var conditions = {};
  if(req.query.question_id && !req.query.answer_id){
    conditions.question = {
      '$eq': req.query.question_id
    };
  } else if(req.query.answer_id && !req.query.question_id){
    conditions.answer = {
      '$eq': req.query.answer_id
    };
  } else {
    conditions.answer = {
      '$eq': -1
    };
    conditions.question = {
      '$eq': -1
    };
  }
  if(req.query.until_id){
    conditions._id = {
      '$lt': req.query.until_id
    }
  }

  var projection = {};

  var options = {
    limit:
      req.query.count &&
      req.query.count > 0 &&
      req.query.count <= 100 ?
      req.query.count : 10,
    sort: '-time'
  };

  function commentFindCallback(err, comments){
    if(err) { return handleError(res, err); }
    var conditions = [
      {path: 'user', select: 'name _id'}
    ];
    function commentPopulateCallback(err, comments){
      if(err) { return handleError(res, err); }
      var formatted = {comments: []};
      _.forEach(comments, function(comment) {
        formatted.comments.push({
          id: comment._id,
          text: comment.text,
          reportCount: comment.reportCount,
          time: dater.format(comment.time),
          user: {
            id: comment.user.id,
            name: comment.user.name
          }
        });
      });
      return res.json(200, formatted);
    }
    Comment.populate(comments, conditions, commentPopulateCallback);
  };

  Comment.find(conditions, projection, options, commentFindCallback);
};

// Creates a new comment in the DB.
exports.create = function(req, res) {
  var docs = {
    text: req.body.text,
    user: req.user._id,
  };
  if(req.answers.length == 0 && req.questions.length === 1){
    docs.question = req.questions[0]._id;
  } else if (req.questions.length == 0 && req.answers.length === 1){
    docs.answer = req.answers[0]._id;
  } else {
    docs = {};
  }

  function questionFindOneAndUpdateCallback(err, comment){
    var formatted = {
      comment: {
        id: comment._id,
        text: comment.text,
        reportCount: comment.reportCount,
        time: dater.format(comment.time),
        user: {
          id: req.user._id,
          name: req.user.name
        }
      }
    };
    res.json(201, formatted);
  }

  var answerFindOneAndUpdateCallback = questionFindOneAndUpdateCallback;

  function commentCreateCallback(err, comment){
    if(err) { return handleError(res, err); }
    if(comment.question && !comment.answer){
      Question.findOneAndUpdate(
        {_id: comment.question},
        {$inc: {commentCount: 1}, $push: {recentComments: {$each: [comment._id] , $slice: -3} } },
        function(err){ questionFindOneAndUpdateCallback(err, comment); }
      );
    } else if(comment.answer && !comment.question){
      Answer.findOneAndUpdate(
        {_id: comment.answer},
        {$inc: {commentCount: 1}, $push: {recentComments: {$each: [comment._id] , $slice: -3} } },
        function(err){ answerFindOneAndUpdateCallback(err, comment); }
      );
    } else {
      return res.json(400, '内部エラー')
    }
  }

  Comment.create(docs, commentCreateCallback);
};

exports.exists = function(req, res, next) {
  var ids = [];
  if(typeof(req.body.comment_id) === 'string'){
    ids = req.body.comment_id.split(',');
  }
  else if(typeof(req.query.comment_id) === 'string'){
    ids = req.body.comment_id.split(',');
  }
  _.remove(ids, function(id) { return !id; });
  var conditions = {
    _id: {'$in': ids}
  };
  function commentFindCallback(err, comments){
    if(err) {return handleError(res, err); }
    req.comments = comments;
    console.log('found comments: ' + comments);
    return next();
  }
  Comment.find(conditions, commentFindCallback);
};


function handleError(res, err) {
  return res.send(500, err);
}

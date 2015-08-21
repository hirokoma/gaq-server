'use strict';

var _ = require('lodash');
var dater = require('./../../components/dater/dater.js');
var error = require('./../../components/errors/messages.js');
var Answer = require('./answer.model');
var Question = require('./../question/question.model');
var Comment = require('./../comment/comment.model');

// Get list of answers
exports.index = function(req, res) {
  function commentPopulateCallback(err, answers){
    if(err) { return handleError(res, err); }
    var formatted = {answers: []};
    _.forEach(answers, function(answer) {
      formatted.answers.push({
        id: answer._id,
        text: answer.text,
        time: dater.format(answer.time),
        commentCount: answer.commentCount,
        recentComments: answer.recentComments,
        likeCount: answer.likeCount,
        user: answer.user
      });
    });
    return res.json(200, formatted);
  }

  function answerPopulateCallback(err, answers){
    if(err) { return handleError(res, err); }
    var conditions = [
      {path: 'recentComments.user', select: 'name _id', model: 'User'}
    ];
    Comment.populate(answers, conditions, commentPopulateCallback);
  }

  function answerFindCallback(err, answers){
    if(err) { return handleError(res, err); }
    var conditions = [
      {path: 'user', select: 'name _id'},
      {path: 'recentComments', select: 'user text _id', options: {sort: '-time'} }
    ];
    Answer.populate(answers, conditions, answerPopulateCallback);
  };

  var conditions = {};
  conditions.question = {
    '$eq': req.query.question_id || -1
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
  Answer.find(conditions, projection, options, answerFindCallback);
};

// Creates a new answer in the DB.
exports.create = function(req, res) {
  var docs = {
    text: req.body.text,
    user: req.user._id,
    question: req.questions && req.questions.length === 1 ? req.questions[0]._id : null
  };

  function questionFindOneAndUpdateCallback(err, answer){
    var formatted = {
      answer: {
        id: answer._id,
        text: answer.text,
        user: {
          id: req.user._id,
          name: req.user.name
        }
      }
    };
    res.json(201, formatted);
  }

  function answerCreateCallback(err, answer){
    if(err) { return handleError(res, err); }
    Question.findOneAndUpdate(
      {_id: answer.question},
      {$inc: {answerCount: 1}},
      function(err){ questionFindOneAndUpdateCallback(err, answer); }
    );
  }

  Answer.create(docs, answerCreateCallback);
};


exports.updateBest = function(req, res) {
  var projection = {};
  var options = {};
  function answerFindOneAndUpdateCallback(err, answer){
    if(err) { return handleError(res, err); }
    if(!answer) { return res.json(400, error.messages.answerUpdateBest['002']); }
    var formatted = {
      answer: {
        id: answer._id,
        text: answer.text,
        user: {
          id: req.user._id,
          name: req.user.name
        },
        isBest: answer.isBest
      }
    };
    res.json(202, formatted);
  };
  function questionFindOneAndUpdateCallback(err, question){
    if(err) { return handleError(res, err); }
    if(!question) { return res.json(400, error.messages.answerUpdateBest['001']); }
    Answer.findOneAndUpdate(
      { _id: question.bestAnswer, isBest: false },
      {$set: {isBest: true}},
      answerFindOneAndUpdateCallback
    );
  };
  function answerFindByIdCallback(err, answer){
    if(err) { return handleError(res, err); }
    Question.findOneAndUpdate(
      { _id: answer.question, bestAnswer: { $exists: false } },
      {$set: {bestAnswer: answer._id}},
      questionFindOneAndUpdateCallback
    );
  };
  Answer.findById(req.body.answer_id, projection, options, answerFindByIdCallback)
};



exports.exists = function(req, res, next) {
  var ids = [];
  if(typeof(req.body.answer_id) === 'string'){
    ids = req.body.answer_id.split(',');
  }
  else if(typeof(req.query.answer_id) === 'string'){
    ids = req.body.answer_id.split(',');
  }
  _.remove(ids, function(id) { return !id; });
  var conditions = {
    _id: {'$in': ids}
  };
  function answerFindCallback(err, answers){
    if(err) {return handleError(res, err); }
    req.answers = answers;
    console.log('found answers: ' + answers);
    return next();
  }
  Answer.find(conditions, answerFindCallback);
};


function handleError(res, err) {
  return res.send(500, err);
}

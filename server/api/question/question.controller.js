'use strict';

var _ = require('lodash');
var dater = require('./../../components/dater/dater.js');
var Question = require('./question.model');
var Comment = require('./../comment/comment.model');

// Get list of questions
exports.index = function(req, res) {
  function commentPopulateCallback(err, questions){
    if(err) { return handleError(res, err); }
    var formatted = {questions: []};
    _.forEach(questions, function(question) {
      var formattedRecentComments = [];
      _.forEach(question.recentComments, function(recentComment) {
        formattedRecentComments.push({
          id: recentComment._id,
          text: recentComment.text,
          time: dater.format(recentComment.time),
          user: {
            id: recentComment.user._id,
            name: recentComment.user.name
          }
        });
      });
      formatted.questions.push({
        id: question._id,
        title: question.title,
        text: question.text,
        game: {
          id: question.game._id,
          title: question.game.title,
          genres: question.game.genres
        },
        time: dater.format(question.time),
        answerCount: question.answerCount,
        commentCount: question.commentCount,
        reportCount: question.reportCount,
        bestAnswer: question.bestAnswer,
        recentComments: formattedRecentComments,
        user: question.user
      });
    });
    return res.json(200, formatted);
  }

  function questionPopulateCallback(err, questions){
    if(err) { return handleError(res, err); }
    var conditions = [
      {path: 'recentComments.user', select: 'name _id', model: 'User'}
    ];
    Comment.populate(questions, conditions, commentPopulateCallback);
  }

  function questionFindCallback(err, questions){
    if(err) { return handleError(res, err); }
    var conditions = [
      {path: 'user', select: '_id name '},
      {path: 'game', select: '_id title genres'},
      {path: 'recentComments', select: '_id user text time', options: {sort: 'time'} }
    ];
    Question.populate(questions, conditions, questionPopulateCallback);
  };

  var conditions = {};
  if(req.query.game_id){
    conditions.game = {
      '$in': req.query.game_id.split(',')
    }
  }
  if(req.query.until_id){
    conditions._id = {
      '$lt': req.query.until_id
    }
  }
  if(req.query.unanswered === 'true'){
    conditions.answerCount = {
      '$eq': 0
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
  Question.find(conditions, projection, options, questionFindCallback);
};

// Get a single question
exports.show = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    return res.json(question);
  });
};

// Creates a new question in the DB.
exports.create = function(req, res) {
  var docs = {
    title: req.body.title,
    text: req.body.text,
    user: req.user._id,
    game: req.games && req.games.length === 1 ? req.games[0]._id : null
  };

  function questionCreateCallback(err, question){
    if(err) { return handleError(res, err); }
    var formatted = {
      question: {
        id: question._id,
        title: question.title,
        text: question.text,
        answerCount: question.answerCount,
        commentCount: question.commentCount,
        reportCount: question.reportCount,
        recentComments: question.recentComments,
        bestAnswer: question.bestAnswer,
        time: dater.format(question.time),
        user: {
          id: req.user._id,
          name: req.user.name
        },
        game: {
          id: req.games[0]._id,
          title: req.games[0].title,
          genres: req.games[0].genres
        }
      }
    };
    res.json(201, formatted);
  }

  Question.create(docs, questionCreateCallback);
};

// Updates an existing question in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Question.findById(req.params.id, function (err, question) {
    if (err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    var updated = _.merge(question, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, question);
    });
  });
};

// Deletes a question from the DB.
exports.destroy = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    question.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.exists = function(req, res, next) {
  var ids = [];
  if(typeof(req.body.question_id) === 'string'){
    ids = req.body.question_id.split(',');
  }
  else if(typeof(req.query.question_id) === 'string'){
    ids = req.body.question_id.split(',');
  }
  _.remove(ids, function(id) { return !id; });
  var conditions = {
    _id: {'$in': ids}
  };
  function questionFindCallback(err, questions){
    if(err) {return handleError(res, err); }
    req.questions = questions;
    console.log('found questions: ' + questions);
    return next();
  }
  Question.find(conditions, questionFindCallback);
};

function handleError(res, err) {
  return res.send(500, err);
}

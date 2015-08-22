'use strict';

var _ = require('lodash');
var Report = require('./report.model');
var Question = require('./../question/question.model');
var Answer = require('./../answer/answer.model');
var Comment = require('./../comment/comment.model');
var dater = require('./../../components/dater/dater.js');

// Creates a new report in the DB.
exports.create = function(req, res) {
  var docs = {
    text: req.body.text,
    user: req.user._id,
  };
  if(
    req.answers.length == 0 &&
    req.comments.length == 0 &&
    req.questions.length === 1
  ){
    docs.question = req.questions[0]._id;
  } else if (
    req.questions.length == 0 &&
    req.comments.length == 0 &&
    req.answers.length === 1
  ){
    docs.answer = req.answers[0]._id;
  } else if (
    req.questions.length == 0 &&
    req.answers.length == 0 &&
    req.comments.length === 1
  ){
    docs.comment = req.comments[0]._id;
  } else {
    docs = {};
  }

  function questionFindOneAndUpdateCallback(err, report){
    var formatted = {
      report: {
        id: report._id,
        text: report.text,
        time: dater.format(report.time),
        user: {
          id: req.user._id,
          name: req.user.name
        }
      }
    };
    if(report.question && !report.answer && !report.comment){
      formatted.report.question = {
        id: report.question
      };
    } else if (report.answer && !report.comment && !report.question){
      formatted.report.answer = {
        id: report.answer
      };
    } else if (report.comment && !report.question && !report.answer){
      formatted.report.comment = {
        id: report.comment
      };
    }
    res.json(201, formatted);
  }

  var answerFindOneAndUpdateCallback = questionFindOneAndUpdateCallback;
  var commentFindOneAndUpdateCallback = questionFindOneAndUpdateCallback;

  function reportCreateCallback(err, report){
    if(err) { return handleError(res, err); }
    var update = {$inc: {reportCount: 1}};
    if(
      report.question &&
      !report.answer &&
      !report.comment
    ){
      Question.findOneAndUpdate(
        {_id: report.question},
        update,
        function(err){ questionFindOneAndUpdateCallback(err, report); }
      );
    } else if(
      report.answer &&
      !report.question &&
      !report.comment
    ){
      Answer.findOneAndUpdate(
        {_id: report.answer},
        update,
        function(err){ answerFindOneAndUpdateCallback(err, report); }
      );
    }
    else if(
      report.comment &&
      !report.question &&
      !report.answer
    ){
      Comment.findOneAndUpdate(
        {_id: report.comment},
        update,
        function(err){ commentFindOneAndUpdateCallback(err, report); }
      );
    }
     else {
      return res.json(400, '内部エラー')
    }
  }

  Report.create(docs, reportCreateCallback);
};

function handleError(res, err) {
  return res.send(500, err);
}

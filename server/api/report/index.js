'use strict';

var express = require('express');
var report = require('./report.controller');
var answer = require('./../answer/answer.controller');
var question = require('./../question/question.controller');
var comment = require('./../comment/comment.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), question.exists, answer.exists, comment.exists, report.create);

module.exports = router;

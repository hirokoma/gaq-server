'use strict';

var express = require('express');
var comment = require('./comment.controller');
var answer = require('./../answer/answer.controller');
var question = require('./../question/question.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), comment.index);
router.post('/', auth.isAuthenticated(), question.exists, answer.exists, comment.create);

module.exports = router;

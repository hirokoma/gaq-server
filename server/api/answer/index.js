'use strict';

var express = require('express');
var answer = require('./answer.controller');
var question = require('./../question/question.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), answer.index);
router.post('/', auth.isAuthenticated(), question.exists, answer.create);
router.put('/best', auth.isAuthenticated(), answer.updateBest);

module.exports = router;

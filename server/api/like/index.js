'use strict';

var express = require('express');
var like = require('./like.controller');
var answer = require('./../answer/answer.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), answer.exists, like.create);

module.exports = router;

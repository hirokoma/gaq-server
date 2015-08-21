'use strict';

var express = require('express');
var question = require('./question.controller');
var game = require('./../game/game.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), question.index);
//router.get('/:id', question.show);
router.post('/', auth.isAuthenticated(), game.exists, question.create);
//router.put('/:id', question.update);
//router.patch('/:id', question.update);
//router.delete('/:id', question.destroy);

module.exports = router;

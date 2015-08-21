'use strict';

var express = require('express');
var game = require('./game.controller');
var genre = require('./../genre/genre.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', game.index);
router.post('/', auth.hasRole('admin'), genre.exists, game.create);

module.exports = router;

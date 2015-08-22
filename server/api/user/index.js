'use strict';

var express = require('express');
var user = require('./user.controller');
var game = require('./../game/game.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

//router.get('/', auth.hasRole('admin'), user.index);
//router.delete('/:id', auth.hasRole('admin'), user.destroy);
router.get('/me', auth.isAuthenticated(), user.me);
//router.put('/:id/password', auth.isAuthenticated(), user.changePassword);
//router.get('/:id', auth.isAuthenticated(), user.show);
router.post('/', game.exists, user.create);
router.put('/', auth.isAuthenticated(), game.exists, user.update);

module.exports = router;

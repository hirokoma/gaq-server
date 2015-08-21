'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var dater = require('./../../components/dater/dater.js');
var random = require('./../../components/rand/rand.js');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var docs = {
    email: dater.timestamp(new Date()) + '-' + random.rand36_8x4() + '@gaq.jp',
    password: random.rand36_8x4(),
    name: req.body.name,
    games: _.map(req.games, '_id')
  };

  function userCreateCallback(err, user){
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*24*365*100 });
    res.json({ token: token });
  }

  User.create(docs, userCreateCallback);
};

exports.update = function(req, res, next) {
  var conditions = {
    _id: req.user._id
  };
  console.log(req.games);
  var update = {
    name: req.body.name ? req.body.name : req.user.name,
    games: req.games && req.games.length >0 ? _.map(req.games, '_id') : req.user.games
  };
  var options = {};

  function userFindOneAndUpdateCallback(err, user){
    if (err) return handleError(res, err);
    var conditions = [
      {path: 'games', select: 'title _id'}
    ];
    function userPopulateCallback(err, user){
      var formatted = {
        user: {
          id: user._id,
          name: user.name,
          games: user.games
        }
      };
      return res.json(200, formatted);
    };
    User.populate(user, conditions, userPopulateCallback);
  }

  User.findOneAndUpdate(conditions, update, options, userFindOneAndUpdateCallback);
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var conditions = [
    {path: 'games', select: 'title _id'}
  ];
  function userPopulateCallback(err, user){
    var formatted = {
      user: {
        id: user._id,
        name: user.name,
        games: _.map(user.games, '_id')
      }
    };
    return res.json(200, formatted);
  };
  User.populate(req.user, conditions, userPopulateCallback);
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

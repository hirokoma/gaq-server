'use strict';

var _ = require('lodash');
var Game = require('./game.model');

exports.index = function(req, res) {
  var conditions = {};
  if(req.query.title){
    var re = new RegExp(req.query.title, 'i');
    conditions.title = {
      $regex: re
    };
  }
  var projection = {};
  var options = {
    limit:
      req.query.count &&
      req.query.count > 0 &&
      req.query.count <= 100 ?
      req.query.count : 10,
    sort: 'title'
  };

  function gameFindCallback(err, games){
    if(err) { return handleError(res, err); }
    var formatted = {games: []};
    _.forEach(games, function(game) {
      formatted.games.push({
        id: game._id,
        title: game.title,
        genres: game.genres
      });
    });
    return res.json(200, formatted);
  }
  Game.find(conditions, projection, options, gameFindCallback);

}

exports.create = function(req, res) {
  var doc = {
    title: req.body.title,
    genres: _.map(req.genres, 'name'),
    image: 'game-image.png',
    description: req.body.description
  };

  function gameCreateCallback(err, game){
    if (err) return handleError(res, err);
    res.json(200, {
      game: {
        id: game._id,
        title: game.title,
        genres: game.genres,
        description: game.description,
        image: game.image
      }
    });
  };
  Game.create(doc, gameCreateCallback);
};

exports.exists = function(req, res, next) {
  var ids = [];
  if(typeof(req.body.game_id) === 'string'){
    ids = req.body.game_id.split(',');
  }
  else if(typeof(req.query.game_id) === 'string'){
    ids = req.body.game_id.split(',');
  }
  _.remove(ids, function(id) { return !id; });
  var conditions = {
    _id: {'$in': ids}
  };
  function gameFindCallback(err, games){
    if(err) {return handleError(res, err); }
    req.games = games;
    console.log('found games: ' + games);
    return next();
  }
  Game.find(conditions, gameFindCallback);
};

function handleError(res, err) {
  return res.send(500, err);
}

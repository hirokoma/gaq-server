'use strict';

var _ = require('lodash');
var Genre = require('./genre.model');

exports.exists = function(req, res, next) {
  var names = [];
  if(typeof(req.body.genre_name) === 'string'){
    names = req.body.genre_name.split(',');
  }
  else if(typeof(req.query.genre_name) === 'string'){
    names = req.body.genre_name.split(',');
  }
  _.remove(names, function(name) { return !name; });
  var conditions = {
    name: {'$in': names}
  };
  function genreFindCallback(err, genres){
    if(err) { return handleError(res, err); }
    console.log('found genres: ' + genres)
    req.genres = genres;
    return next();
  }
  Genre.find(conditions, genreFindCallback);

};

function handleError(res, err) {
  return res.send(500, err);
}

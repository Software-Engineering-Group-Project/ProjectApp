var express = require('express');
var router = express.Router();
var validator = require('validator');
var Film = require('../models/Film');
var Genre = require('../models/Genre');
var Actor = require('../models/Actor');
var Director = require('../models/Director');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Add genre to database
router.post('/addGenre', function(req, res, next) {
  genre = new Genre(req.body);
  genre.save(function(err, savedGenre){

    if (err)
      throw err;
    
    res.json({
      "Success" : "Yes"
    });
  });
});

//Getting genres in database, mostly here just for test purposes
router.get('/getGenres', function(req, res, next){
  Genre.find({}, function(err, genres){
    if (err)
      res.send(err);
    
    res.json(genres);
  });
});

//FILMS FUNCTIONS
//adding film to database
router.post('/addFilm', function(req, res, next) {
  film = new Film(req.body);
  film.save(function(err, savedFilm){
    if (err)
      throw err;
    
    res.json({
      "Success" : "Yes"
    });
  });
});

//getting all films in database
router.get('/getFilms', function(req, res, next){
  Film.find({}, function(err, films){
    if (err)
      res.send(err);
    
    res.json(films);
  });
});

//function for getting all films in database by particular genre

router.get('/getFilmbyGenre', function(req, res, next){
  var genreName = req.query.name;
  console.log(genreName);
    Film.find({genres:genreName}, function(err, films){
      if (err)
        res.send(err);
      res.json(films);
    });
});

//TODO: function to get films with rating greater than user input
router.get('/getFilmbyRating', function(req, res, next){
  var inputRating = parseFloat(req.query.rating);
  var direction = parseInt(req.query.direction);
  console.log(inputRating);
  console.log(direction);
  if (direction == 0)
  {
    Film.find({average_review: {$gt: inputRating}}, function(err, films){
      if (err)
        res.send(err);
      res.json(films);
    }).sort({average_rating: 1});
  }
  else 
  {
    Film.find({average_review: {$lt: inputRating}}, function(err, films){
      if (err)
        res.send(err);
      res.json(films);
    }).sort({average_rating: -1});
  }
});


///Retrieving stuff by tags
router.get('/getFilmByTags', function(req, res, next){
  var tag = req.query.tag;
  
  Film.find({tags: tag}, function(err, films){
    if (err)
      res.send(err);
    res.json(films);
  });
});

//temp thing: delete value from genres
router.delete('/deleteGenre', function(req, res, next){
  Genre.deleteOne({}, function(err)
  {
    if(err)
      res.send(err);
    console.log("Success.");
  });
});

//other temp thing: delete value from films
router.delete('/deleteFilm', function(req, res, next){
  Film.deleteOne({}, function(err)
  {
    if(err)
      res.send(err);
    console.log("Success.");
  });
});

//SORTING stuff

module.exports = router;

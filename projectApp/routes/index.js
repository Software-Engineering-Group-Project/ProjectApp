var express = require('express');
var router = express.Router();
var validator = require('validator');
//var Film = require('../models/Film');
var Genre = require('../models/Genre');

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

router.get('/getGenres', function(req, res, next){
  Genre.find({}, function(err, genres){
    if (err)
      res.send(err);
    
    res.json(genres);
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var validator = require('validator');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// temp thing

router.delete('/deleteUser', function(req, res, next){
  User.deleteOne({}, function(err){
    if (err)
      throw err;
    res.json({"success": "yes"});
  });
});

router.get('/getUser', function(req, res, next){
  User.findOne({}, function(err, user){
    if (err)
      throw err;
    res.json(user);
  });
});


//important thing
router.post('/register', function(req, res, next){
  var username = req.body.user_name;
  var userEmail = req.body.email;
  var password = req.body.password;

  if (username === null || userEmail === null || password === null)
  {
    res.json({"err" : "empty field"});
  }
  else if (validator.isEmail(userEmail))
  {
    User.findOne({$or: [{user_name: username}, {email : userEmail}]}, function(err, user)
    {
      if(err)
      res.json({"not valid1" : "go away"});
      if(user)
      {
        res.status(401).json({
          "status": "info",
          "body": "User already taken."
        });
      }
      else
      {
        var newUser = new User();

        //set credentials
        newUser.user_name = username;
        newUser.email = userEmail;
        newUser.password = newUser.generateHash(password);
        newUser.access_token = createJwt({user_name : username});
        newUser.save(function(err, user){
          if (err)
            throw err;
        res.cookie('Authorisation', 'Bearer' + user.access_token);
        res.json({"Success": "Accound created!"});
        });
      }
    });
  }
  else
  {
    res.json({"not valid" : "go away"});
  }
});


//login
router.post('/login', function(req, res, next){
  var username = req.body.user_name;
  var password = req.body.password;
  
  if (username === null || password === null)
  {
    res.json({"err" : "empty field"});
  }
  else
  {
    User.findOne({user_name : username}, function(err, user){
      if(err)
        res.send(err);
      if(user)
      {
        if (user.validPassword(password))
        {
          user.access_token = createJwt({user_name : username});
          user.save();
          res.cookie('Authorisation', 'Bearer' + user.access_token);
          res.json({"success" : "logged in"});
        }
        else
        {
          res.status(401).send({
            "status" : "error",
            "body" : "email or password do not match"
          });
        }
      }
      else
      {
        res.status(401).send({
          "error" : "user not found"
        });
      }
    });
  }
});

function createJwt(profile)
{
    return jwt.sign(profile, "Token", 
    { expiresIn: '10s' });
}

module.exports = router;

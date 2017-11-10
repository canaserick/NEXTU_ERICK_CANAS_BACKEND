// Route route module

var express = require('express');
var router = express.Router();
var Storage = require('./storage')

// Home page route
router.get('/', function (req, res) {
  console.log('en get')
  Storage.getAllData()
    .then(function (data){
      res.json(data)
    }). catch(function(error){
      res.sendStatus(500).json(error)
    })
})

// About page route
router.get('/about', function (req, res) {
  res.send('Finder this wiki');
})

router.get('/message', function(req, res){
  //get Message
  res.send('Hola Mundo')
  res.end
})

router.post('/users', function(req, res){
  //post Users
  res.send('Hola Mundo')
  res.end
})

router.post('/message', function(req, res){
  //post Message
  res.send('Hola Mundo')
  res.end
})

module.exports = router;

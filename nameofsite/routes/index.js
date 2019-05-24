var express = require('express');
var router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const myDB = 'todo';

//const db = client.db(myDB);

/* GET home page. */
var str = 'blah'
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expresssss', str1: 'blah' });
});

router.get('/tests', function(req,res){
  mongo.connect(url,function(err,client){
    assert.equal(null,err);
    console.log("Connected successfully to server");
    const db = client.db(myDB)
    const collection = db.collection('employees');
    collection.find({}).toArray(function(err,docs){
      var employees=[];
      docs.forEach(empl=>{
        employees.push(empl.name);
        
      })
      res.render('index',{blah:employees})
      if(docs){
        res.render('index',{name: JSON.stringify(docs)});
      }
    })
  })
})

module.exports = router;

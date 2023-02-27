var http = require('http');
var url = require('url');

var monk = require('monk');
var db = monk('localhost:27017/Users');
var express = require('express')
var session = require('express-session');

var app = express();
var server = app.listen(4242);

var cors = require('cors')

app.use(cors())

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.get('/register', function(req, res){
    console.log("REGISTER")
    var db = req.db
    var collection = db.get('usercollection')

    var urlParts = url.parse(req.url, true)

    var username = urlParts.query['username']
    var password = urlParts.query['password']

    inserted = collection.insert({
        "username" : username,
        "password" : password,
        "friends" : [],
        "messages" : [],
    }).then(function(inserted){
        res.status(200).send(inserted)
    })


})

app.get('/login', function(req, res){
    var db = req.db
    var collection = db.get('usercollection')
    
    var urlParts = url.parse(req.url, true)
    
    var username = urlParts.query['username']
    var password = urlParts.query['password']
    
    /*console.log(collection.find( { "username" : username, "password" : password} ))
    
    if(!collection.find( { "username" : username, "password" : password} )){
        console.log("NOPE")
        return false
    }

    console.log("YES")
    return true*/


    collection.find( { "username" : username, "password" : password} )
    .then(function(data){
        console.log(data)
            if(data.length == 0){
                console.log("NOPE")
                return false
            }
            else{
                console.log("YES")
                return true
            }
        })
    });
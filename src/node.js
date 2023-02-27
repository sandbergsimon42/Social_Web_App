var http = require('http');
var url = require('url');

var monk = require('monk');
var db = monk('localhost:27017/Users');
var express = require('express')
var session = require('express-session');

var app = express();
var server = app.listen(4242);

var session = require('express-session');
app.use(session({resave: false,
                secure: false,
                saveUninitialized: true,
                secret: 'shhhhhhh',
                cookie: { maxAge: 60* 60 * 60000 }}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });
                  

var cors = require('cors')

app.use(cors({
    "credentials": true,
    "origin": ["http://127.0.0.1:8080", "http://localhost:8080"],
    "methods": "GET, POST, PUT",
    "allowedHeaders": "Origin, X-Requested-With, Content-Type, Accept",
    "preflightContinue": true
}));

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.get('/register', function(req, res){
    /*
    Kallas på när en användare klickar på registrera.
    Registrerar en användare om användarnamnet inte är upptaget.
    */
    var db = req.db
    var collection = db.get('usercollection')

    var urlParts = url.parse(req.url, true)

    var username = urlParts.query['username'].toLowerCase()
    var password = urlParts.query['password']

    collection.find( {'username' : {$eq: username }})
        .then(function(data){   
            if(data.length != 0){
                res.status(400).send()
            }
            else{
                inserted = collection.insert({
                    "username" : username,
                    "password" : password,
                    "friends" : [],
                    "messages" : [],
                }).then(function(inserted){
                    res.status(200).send(inserted)
                })
            };
        });
});

app.get('/login', function(req, res){
    /*
    Kallas på när en användare klickar på logga in.
    Ger användaren en kaka om information användaren matat in stämmer överens med inforation i databas.
    */
    var db = req.db
    var collection = db.get('usercollection')
    
    var urlParts = url.parse(req.url, true)
    
    var username = urlParts.query['username'].toLowerCase()
    var password = urlParts.query['password']

    collection.find( { "username" : { $eq: username }, "password" : {$eq: password }} )
    .then(function(data){
            if(data.length == 0){
                res.status(405).send()
            }
            else{
                var sessionData = req.session;
                sessionData.user = {};
                sessionData.user.username = username;                
                res.status(200).send(sessionData.user)
            }
        })
    });

app.get('/getfriends', function(req, res){
    /*
    Kallas på när en userpage skapas.
    Returnerar en lista på alla vänner som finns i databasobjektet som stämmer överens med användarnamn
    */
    var db = req.db
    var collection = db.get('usercollection')
    
    var urlParts = url.parse(req.url, true)
    
    var username = urlParts.query['username'].toLowerCase()
    collection.find( { "username" : { $eq: username }})
    .then(function(data){
        if(data.length == 0){
            res.status(405).send([])
        }
        else{
            var friends = data[0].friends
            res.status(200).send(friends)
        }
    })
});

app.get('/addfriend', function(req, res){
    /*
    Kallas på när en användare vill lägga till en vän.
    Lägger till användarnamn från URL in i databasarray under "friends".
    */
    var db = req.db
    var collection = db.get('usercollection')
    
    var urlParts = url.parse(req.url, true)
    
    var username = urlParts.query['username'].toLowerCase()
    var friendname = urlParts.query['friendname']

    collection.find( { "username" : { $eq: username }})
    .then(function(data){
        if(data.length == 0){
            res.status(405).send(":/")
        }
        else{
            if(data[0].friends.includes(friendname)){
                res.status(405).send(":(")
            }
            else{
                collection.update({"username": username}, {$push: {"friends": friendname}})
                res.status(200).send(":)")
            }
        }
    })
});

app.get('/getmessages', function(req, res){
    /*
    Kallas på när en userpage skapas.
    Returnerar en lista på alla meddelanden som finns i databasobjektet som stämmer överens med användarnamn
    */
    var db = req.db
    var collection = db.get('usercollection')
    
    var urlParts = url.parse(req.url, true)
    
    var username = urlParts.query['username'].toLowerCase()
    collection.find( { "username" : { $eq: username }})
    .then(function(data){
        if(data.length == 0){
            res.status(405).send([])
        }
        else{
            var messages = data[0].messages
            res.status(200).send(messages)
        }
    })
});

app.get('/addmessage', function(req, res){
    /*
    Kallas på när en användare vill lägga till ett meddelande.
    Lägger till meddelande från URL in i databasarray under "messages".
    */
    var db = req.db
    var collection = db.get('usercollection')
    
    var urlParts = url.parse(req.url, true)
    
    var username = urlParts.query['username'].toLowerCase()
    var message = urlParts.query['message']

    collection.find( { "username" : {$eq: username}})
    .then(function(data){
        if(data.length == 0){
            res.status(405).send("=(")
        }
        else{
            collection.update({"username": username}, {$push: {"messages": message}})
            res.status(200).send(message)
        }
    })
});

app.get('/searchname', function(req, res){
    /*
    Kallas på när knappen på söksidan trycks.
    Returnerar en lista av användare som matchar regexuttrycket.
    */
    var db = req.db
    var collection = db.get('usercollection')
    var urlParts = url.parse(req.url, true)
    var username = urlParts.query['username'].toLowerCase()

    collection.find( { "username" : {$regex: username}})
    .then(function(data){
        if(data.length == 0){
            res.status(405).send([])
        }
        else{
            var search_result = []
            for (const item in data){
                search_result.push(data[item].username)
            }
            res.status(200).send(search_result)
        }
    })
    
})

    
app.get('/validate', function(req, res){
    /*
    Kallas på när det ska kollas om en användare är inloggad.
    Kollar så att användaren har en giltig kaka. 
    */
    var sessionData = req.session;
    if(!sessionData.user){
        res.status(400).send()
    }
    else{
        res.status(200).send(sessionData.user)
    }
})

app.get('/userexist', function(req, res){
    /*
    Kallas på när en ny användarsida laddas.
    Kollar att användaren existerar i databasen.
    */
    var db = req.db
    var collection = db.get('usercollection')
    var urlParts = url.parse(req.url, true)
    var username = urlParts.query['username'].toLowerCase()

    collection.find( { "username" : {$eq: username}})
    .then(function(data){
        if(data.length == 0){
            res.status(405).send(username)
        }
        else{
            res.status(200).send(username)
        }
    })
    
})

app.get('/logout',function(req, res) {
    /*
    Kallas på när en användare klickar på logga ut knappen.
    Förstör användarens kaka.
    */
    var sessionData = req.session;
    sessionData.destroy()
    res.status(200).send()
});



app.get('/clear', function(req, res) {
    var db = req.db
    var collection = db.get('usercollection')
    collection.drop(function(err, delOK) {
        if (err) throw err;
    });
    res.status(200).send()
}); 











































/*
Se allt i databasen:
use Users
db.usercollection.find().pretty()

Rensa databas:
use Users
db.dropDatabase();

Förstöra en port
sudo fuser -k -n tcp 4242
*/


/*
Saker simon hittat som är fult
    - Hemsidan krashar om man söker på []
    - Sökfunktionen går att söka med regexuttryck
    - Home-knapp i navbar laddar först inloggningssidan när man aldrig kan gå dit utan att trycka log out
    - Vissa sidor tar lång tid på sig att ladda och visar upp delar av sidan innan hela är klar
    - Om man är utloggad och trycker på search hamnar man på inloggninssidan
    - Logoutknapp finns på 404 sidan

För att starta allt på simons  hårddisk:

radera npm_modules mappen
i projectmappen skriv npm install

terminal1: i projectmappen: npm run dev
terminal2: i terminal sudo service mongod start
                      mongo
                      use Users

terminal3: i srcmappen: node node.js

öppna firefox och gå in på localhost:8080


    */
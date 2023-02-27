// Import the dependencies for testing
var assert = require('assert'),
    request = require('request'),
    chai = require('chai'),
    expect = chai.expect,
    app = require('../src/node.js')


request.get("http://127.0.0.1:4242/clear")

describe("Register", () => {
    describe("GET register", () => {
        it("register user workds", (done) => {
            request.get("http://127.0.0.1:4242/register?username=test&password=123", function(req, res){
                object = JSON.parse(res.body)
                expect(res.body).to.include(object.username);
                assert.equal(res.statusCode, 200);
                assert.equal("test", object.username);
                done();
            })
        })
        it("username already exists", (done) => {
            request.get("http://127.0.0.1:4242/register?username=test&password=123", function(req, res){
                assert.equal(res.statusCode, 400);
                done();
            })   
        })
    })
})

describe("LOGIN", () => {
    describe("GET login", () => {
        it("registered user logins", (done) => {
            request.get("http://127.0.0.1:4242/login?username=test&password=123", function(req, res){
                object = JSON.parse(res.body)
                expect(res.body).to.include(object.username);
                assert.equal(res.statusCode, 200);
                assert.equal("test", object.username);
                done();
            })
        })
        it("unregistered user logins", (done) => {
            request.get("http://127.0.0.1:4242/login?username=wrong&password=123", function(req, res){
                assert.equal(res.statusCode, 405);
                done();
            })
        })
    })
})


describe("FRIENDS", () => {
    describe("ADD Friend", () => {
        it("register friendUser", (done) => {
            request.get("http://127.0.0.1:4242/register?username=friend1&password=123", function(req, res){
                object = JSON.parse(res.body)
                expect(res.body).to.include(object.username);
                assert.equal(res.statusCode, 200);
                assert.equal("friend1", object.username);
                done();
            })
        })
        it("testUsers friends", (done) => {
            request.get("http://127.0.0.1:4242/getfriends?username=test", function(req, res, data){
                assert.equal(res.statusCode, 200);
                assert.equal("[]", data);
                done();
            })
        })
        it("testUser add friend1", (done) => {
            request.get("http://127.0.0.1:4242/addfriend?username=test&friendname=friend1", function(req, res, data){
                assert.equal(res.statusCode, 200);
                assert.equal(data, ":)");
                done();
            })
        })
        it("testUser add friend1 again", (done) => {
            request.get("http://127.0.0.1:4242/addfriend?username=test&friendname=friend1", function(req, res, data){
                assert.equal(res.statusCode, 405);
                assert.equal(data, ":(");
                done();
            })
        })
        it("testUsers friends after friend1 befriended", (done) => {
            request.get("http://127.0.0.1:4242/getfriends?username=test", function(req, res, data){
                assert.equal(res.statusCode, 200);
                assert.equal('["friend1"]', data);
                done();
            })
        })
        
        it("getfriends on a non-existing user", (done) => {
            request.get("http://127.0.0.1:4242/getfriends?username=wrong", function(req, res, data){
                assert.equal(res.statusCode, 405);
                assert.equal('[]', data);
                done();
            })
        })

        it("addfriend by a non-existing user", (done) => {
            request.get("http://127.0.0.1:4242/addfriend?username=wrong&friendname=friend1", function(req, res, data){
                assert.equal(res.statusCode, 405);
                assert.equal(':/', data);
                done();
            })
        })
        
    })
})

describe("/addmessage", () => {
    describe("Checks if message is sent", () => {
        it("Checks database status after message is sent", (done) => {
            request.get("http://127.0.0.1:4242/addmessage?username=test&message=hejhej", function(req, res, data){
                assert.equal(data, "hejhej");
                assert.equal(res.statusCode, 200);
                done();
            })
        })
        it("Checks non-existing user", (done) => {
            request.get("http://127.0.0.1:4242/addmessage?username=notauser&message=hejhej", function(req, res, data){
                assert.equal(res.statusCode, 405);
                assert.equal(data, "=(");
                done();
            })
        })
    })
})

describe("/getmessages", () => {
    describe("Checks if message reaches database", () => {
        it("Checks database status after message is sent", (done) => {
            request.get("http://127.0.0.1:4242/getmessages?username=test", function(req, res, data){
                assert.equal(data, '["hejhej"]');
                assert.equal(res.statusCode, 200);
                done();
            })
        })
        it("Checks database status after getmessage on non-existing user", (done) => {
            request.get("http://127.0.0.1:4242/getmessages?username=wrong", function(req, res, data){
                assert.equal(data, '[]');
                assert.equal(res.statusCode, 405);
                done();
            })
        })  
    })
})

describe("/searchname", () => {
    describe("Checks for user in database", () => {
        it("Checks if user is searchable", (done) => {
            request.get("http://127.0.0.1:4242/searchname?username=te", function(req, res, data){
                assert.equal(data, '["test"]');
                assert.equal(res.statusCode, 200);
                done();
            })
        }) 
        it("Search for missing user", (done) => {
            request.get("http://127.0.0.1:4242/searchname?username=notauser", function(req, res, data){
                assert.equal(res.statusCode, 405);
                done();
            })
        })
    })
})


describe("/userexist", () => {
    describe("Checks for user in database", () => {
        it("Checks for correct username", (done) => {
            request.get("http://127.0.0.1:4242/userexist?username=test", function(req, res, data){
                assert.equal(data, "test");
                assert.equal(res.statusCode, 200);
                done();
            })
        }) 
        it("Checks for missing username", (done) => {
            request.get("http://127.0.0.1:4242/userexist?username=notauser", function(req, res, data){
                assert.equal(data, "notauser");
                assert.equal(res.statusCode, 405);
                done();
            })
        })
    })
})

describe("Logout", () => {
    describe("User logs out", () => {
        it("200", (done) => {
            request.get("http://127.0.0.1:4242/logout", function(req, res){
                assert.equal(res.statusCode, 200);
                done();
            })
        })        
    })
})

request.get("http://127.0.0.1:4242/clear")

describe("Clear", () => {
    describe("Database clears", () => {
        it("No objects in database", (done) => {
            request.get("http://127.0.0.1:4242/clear", function(req, res){
                assert.equal(res.statusCode, 200);
                done();
            })
        })        
    })
})
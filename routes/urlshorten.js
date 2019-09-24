const UrlShorten = require('../models/schemaUrl');
var redis = require('redis');
var client = redis.createClient();
const request = require('request');
let urlCached = [];

request('http://localhost:3001/url', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
    body.forEach(element => {
        urlCached.push(element.urlCode);
      });
    console.log(urlCached);  
});

exports.findUrl = (req,res) => {
    client.exists(req.params.urlCode, function(err, reply) {
        if (reply === 1) {
            console.log('Present in redis');
            client.get(req.params.urlCode, function(err, reply) {
                console.log(reply);
                res.send(reply);
            });
        } else {
            console.log('Not present in redis');
            UrlShorten.findOne({ urlCode: req.params.urlCode }, function(err, user) {
                if (err) throw err;
                if(!user) {
                    return res.status(404).send({
                        message: "Not found for the shortUrl : " + req.params.urlCode
                    });            
                }                
                res.send(user);
                console.log(user);
                client.set(user.urlCode, user.originalUrl, function(err1,reply){
                    if (err1) throw err1;
                    console.log(reply);
                });
                console.log(user.originalUrl);
            });
        }
    });
};

exports.findOne = (req, res) => {
    UrlShorten.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Not found for noteId " + req.params.noteId
            });            
        }
        res.send(note);
        //res.redirect(note.shortUrl);
        //console.log(note.shortUrl);
        //res.redirect('http://gmail.com');
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Not found for noteId " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving data for noteId " + req.params.noteId
        });
    });
};

exports.findAll = (req, res) => {
    UrlShorten.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred"
        });
    });
};

exports.create = (req,res) => {
    if(urlCached.length < 5){
        console.log("calling more");
        request('http://localhost:3001/url', { json: true }, (err, res, body) => {
            if (err) { 
                return console.log(err); 
            }
            body.forEach(element => {
                urlCached.push(element.urlCode);
            });
            console.log(urlCached);  
        });

    }
    let url = urlCached.pop();
    const note = new UrlShorten({
        originalUrl: req.body.originalUrl,
        urlCode: url
    });    
    console.log(note);
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred"
        });
    });
};
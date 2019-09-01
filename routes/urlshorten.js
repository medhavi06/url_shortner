const mongoose = require("mongoose");
const UrlShorten = require('../models/UrlShorten');

exports.findOne = (req, res) => {
    UrlShorten.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Not found for noteId " + req.params.noteId
            });            
        }
        res.send(note);
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

exports.create = (req, res) => {
    var d = new Date();
    const code = d.getTime();    
    const short_url = "http://shortened.com/" + code;  
    console.log(short_url);
    const note = new UrlShorten({
        originalUrl: req.body.originalUrl,
        urlCode: code,
        shortUrl: short_url
    });    
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred"
        });
    });
};
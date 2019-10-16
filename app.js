const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//require('dotenv').config();
const config = require('./config/config');
('../config/config');
const PORT = 3000;
var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('connected');
});

app.set('port', config.server.PORT || 4100);

app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
});

const db_url = config.mongoDB.URL;

mongoose.connect(db_url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to the DB");    
}).catch(err => {
    console.log("Couldn't connect to the DB...", err);
    process.exit();
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hey there!");
});

require('./routes/routes')(app);

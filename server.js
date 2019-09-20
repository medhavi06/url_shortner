const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = 3000;
var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('connected');
});

app.set('port', process.env.PORT || 4100);

app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
});

const db_url = process.env.DATABASE;

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

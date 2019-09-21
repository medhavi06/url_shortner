const mongoose = require("mongoose");
const urlShortenSchema = mongoose.Schema({
  originalUrl: String,
  urlCode: String,
  shortUrl: String
},{ versionKey: false });

module.exports = mongoose.model("UrlShorten", urlShortenSchema);
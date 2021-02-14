const mongoose = require("mongoose");

var memeSchema = mongoose.Schema({
    name:String,
    url:String,
    caption:String
})

module.exports = mongoose.model("Meme", memeSchema)
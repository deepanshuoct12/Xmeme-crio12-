const express = require('express');
const Meme = require('./Models/Meme');
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// MongoDB Configuration
const db =
  "mongodb+srv://deepanshu:deepanshu@cluster0.mn9pq.mongodb.net/memes?retryWrites=true&w=majority";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

mongoose.set("debug", true);

app.get('/memes', (req, res)=>{
  Meme.find({}).limit(100).then(memes=>{  
      return res.json(memes)
  })
})

app.post('/memes', (req, res)=>{
  const {
    body: {meme}
  } = req;

  const newMeme = new Meme(meme);
  newMeme.save().then((meme)=>{
    return res.json(meme)
  })
})

const port = process.env.PORT || 4000

app.listen(port, function () {
  console.log(` listening on port ${port}! \n http://localhost:${port}`)
})
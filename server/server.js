const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

//imports
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const indexRouter = require('./routes/indexRouter')

//settings
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.json());

//routes
app.use('/', indexRouter)
//database
const DB_NAME = process.env.DB_NAME;
const DB_LINK = process.env.DB_LINK + DB_NAME;

mongoose.connect(DB_LINK, { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=>{console.log("mongoose found his way to the database...")})
.catch((err)=>{console.log(err)})

app.listen(PORT, ()=>{`App listening to ${PORT}`});
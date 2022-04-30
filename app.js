const mongoose = require('mongoose');
const express = require ('express');
const app = express();
const dotenv = require('dotenv').config();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));
// const helmet = require("helmet");

// Blogrouter
const blogRoutes = require('./routes/routes');

app.use(express.static("public"));
app.use(blogRoutes);
app.set('view engine', 'ejs');
// app.use(helmet());

mongoose.connect(process.env.MONGOOSE_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then((result)=>{
    app.listen(3001);
    console.log('Successful Database Connection')
}).catch((err)=>{
    console.log(err);
})
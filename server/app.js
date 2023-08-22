const express=require('express');
// const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');
const Authenticate = require('./middleware/authenticate');

const app=express();

dotenv.config({path: './config.env'});

require('./db/conn');
app.use(express.json());
app.use(require('./router/auth.js'));
app.use(cookieParser());
app.use(Authenticate);

// app.use(cors());

const PORT=process.env.PORT;
app.listen(PORT || 5000,(err) =>{
    console.log('App listening at port 5000');
})
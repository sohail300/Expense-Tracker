import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connectDB } from './db/conn.js';
import authRoute from './router/auth.js';
import contactRoute from './router/contact.js';
import apiRoute from './router/api.js';

const app = express();
dotenv.config({ path: './config.env' });

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use('/auth', authRoute);
app.use('/contact', contactRoute);
app.use('/api', apiRoute);

app.get('/', (req, res) => {
    res.send('Root')
})

const PORT = process.env.PORT;
app.listen(PORT || 5000, (err) => {
    console.log(`App listening at port ${PORT}`);
})
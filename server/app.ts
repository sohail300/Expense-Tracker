import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors'
import helmet from 'helmet'
import { connectDB } from './db/conn.js';
import authRoute from './router/auth.js';
import contactRoute from './router/contact.js';
import apiRoute from './router/api.js';

const app = express();
// dotenv.config({ path: '../.env' });
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// app.use(helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       fontSrc: ["'self'", "https://fonts.gstatic.com/"]
//     }
//   }));

connectDB();

app.use('/auth', authRoute);
app.use('/contact', contactRoute);
app.use('/api', apiRoute);

app.get('/', (req, res) => {
    res.send('Root Page')
})

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
    console.log(`App listening at port ${PORT}`);
})
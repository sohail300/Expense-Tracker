import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: './config.env'});

const DB=process.env.DATABASE;

export function connectDB(){
    mongoose.connect(DB, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Connected to MongoDB")
    }).catch((err) => console.log("Could not connect to MongoDB", err));
}
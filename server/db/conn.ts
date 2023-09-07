import mongoose from "mongoose";
import dotenv from "dotenv";

// dotenv.config({ path: "./config.env" });
dotenv.config();

const DB = process.env.DATABASE;

export async function connectDB() {
  try {
    if(!DB){
      throw new Error("DATABASE environment variable is not defined.");
    }
    
    const uri:string = DB;
    await mongoose.connect(uri);
    console.log("Database connected");
  } catch (err) {
    console.log("Error connecting to DB: " + err);
  }
}
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const transactionSchema= new mongoose.Schema({
  userId: String,
  title:String,
  amount:Number,
  date:Date,
  description:String,
  type:String
})

const ContactSchema= new mongoose.Schema({
  userId: String,
  id:String,
  name:String,
  email:String,
  message:String,
  time:Date,
})

const User = mongoose.model("User", userSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);
const Contact = mongoose.model("Contact", ContactSchema);

export { User, Transaction, Contact };
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db/conn");
const authenticate = require('../middleware/authenticate.js');
// router.use(authenticate);

const User = require("../model/userSchema.js");

router.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    confirmpassword,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !confirmpassword
  ) {
    return res.status(422).json({ error: "Field left empty - Register" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    // console.log("inside try");
    if (userExist) {
      return res.status(422).json({ error: "User already exists" });
    } else if (password != confirmpassword) {
      return res.status(422).json({ error: "Passwords not matching" });
    }

    const user = new User({
      name,
      email,
      password
    });

    // Called bcrypt middleware here

    const userRegister = await user.save();

    if (userRegister) {
      res.status(201).json({ message: "Registered successfully" });
    } else {
      res.status(500).json({ error: "Failed to Registered" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});


router.post("/login", async (req, res) => {
  // Collecting data from Frontend
  console.log("Inside Login 1")
  const { email, password } = req.body;
  
  // If any of the fields are left empty, then return an error msg with status 422
  if (!email || !password) {
    console.log('Field empty');
    return res.status(400).json({ error: "Field left empty - Login" });
  }
  
  try {
    console.log('inside try');
    // If the user doesn't exist, then return an error msg with status 422
    const userLogin = await User.findOne({ email: email });
    
    if (!userLogin) {
      console.log("Invalid Credentails")
      return res.status(400).json({ error: "Invalid Credentails" });
    }
    
    // Compare the passwords
    const isMatch = await bcrypt.compare(password, userLogin.password);
    console.log("Inside Login 2")
    
    // Generate cookie
    const token = await userLogin.generateAuthToken();
    console.log("Token:")
    console.log(token);
    
   res.cookie('jwtoken', token, {
      expires: new Date(Date.now() + 108000),
       httpOnly: false
    });

    // If passwords don't match, then return an error msg with status 422
    if (!isMatch) {
      console.log("Invalid Credentails")
      return res.status(400).json({ error: "Invalid Credentails" });
    } else {
      console.log("Login successfully")
      return res.status(201).json({ message: "Login successfully" });
    }
  } catch (err) {
    console.log("Inside Error")
    console.log(err);
  }
});

router.get('/navbar',authenticate,(req,res) => {
  console.log("In Navbar");
  res.send(req.rootUser);
})


router.get('/dashboard',authenticate,(req,res) => {
    console.log("In Dashboard");
    res.send(req.rootUser);
})

router.get('/logout',(req,res)=> {
  console.log("Logout");
  if(res.clearCookie!= null){

    res.clearCookie('jwtoken',{path:'/login'});
    res.status(200).send('User Logout');
  }
  else {
    console.log('null')
  }
})

module.exports = router;
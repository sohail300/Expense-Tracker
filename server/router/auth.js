import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../model/schema.js';
import { z } from 'zod';
import { Authenticate } from '../middleware/authenticateJwt.js';

dotenv.config({ path: '../config.env' })

const router = express.Router();

const registerInput = z.object({
  name: z.string().min(1).max(20),
  email: z.string().min(1).max(30).email(),
  password: z.string().min(6).max(20),
  cpassword: z.string().min(6).max(20)
})

router.post('/register', async (req, res) => {
  try {
    const parsedInput = registerInput.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(411).json({
        msg: parsedInput.error
      })
    }

    const name = parsedInput.data.name;
    const email = parsedInput.data.email;
    const password = parsedInput.data.password;
    const cpassword = parsedInput.data.cpassword;

    if (password != cpassword) {
      return res.status(401).send('Invalid Credential')
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(403).send('User already exists')
    } else {
      const obj = {
        name,
        email,
        password
      }

      const newUser = new User(obj);
      newUser.save();
      console.log("New User created");

      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
      return res.status(201).json({ msg: 'User Created Successfully', token })
    }
  } catch (err) {
    res.status(500).send('Internal error: ' + err);
  }
})

const loginInput = z.object({
  email: z.string().min(1).max(30).email(),
  password: z.string().min(6).max(20),
})

router.post('/login', async (req, res) => {
  try {
    const parsedInput = loginInput.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(411).json({
        msg: parsedInput.error
      })
    }

    const email = parsedInput.data.email;
    const password = parsedInput.data.password;

    const user = await User.findOne({ email, password });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
      return res.status(201).json({ msg: 'User Created Successfully', token })
    } else {
      return res.status(403).send('Invalid Username or Password')
    }
  } catch (err) {
    res.status(500).send('Internal error: ' + err);
  }
})

router.get('/profile', Authenticate, async (req, res) => {
  const id = req.user;
  console.log(id);

  const user = await User.findById(id);
  // console.log(user);
  if (user) {
    const name = user.name;
    console.log(name)
    return res.json({ msg: "Name", name })
  } else {
    return res.send('Error');
  }
})

router.put('/profile/:id', Authenticate, async (req, res) => {
  const id = req.params.id;
  const updateData = { name: req.body.newName };

  const updatedDocument = await User.findOneAndUpdate({ _id: id }, updateData, { new: true })

  if (updatedDocument) {
    res.status(201).send('Document Updated')
  } else {
    res.status(404).send('Error')
  }
})

router.get('/me', Authenticate, (req, res) => {
  const id = req.user;
  return res.json({ msg: "User id", id })
})

export default router;
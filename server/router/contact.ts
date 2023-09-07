import express from "express";
import { Authenticate } from "../middleware/authenticateJwt.js";
import { z } from "zod";
import { Contact } from "../model/schema.js";

const router = express.Router();

const contactInput = z.object({
  name: z.string().min(1).max(20),
  email: z.string().min(1).max(30).email(),
  message: z.string().min(1).max(200),
});

router.post("/contact", Authenticate, async (req, res) => {
  const parsedInput = contactInput.safeParse(req.body);

  if (parsedInput.success === false) {
    return res.status(411).json({
      msg: parsedInput.error,
    });
  }

  const name = parsedInput.data.name;
  const email = parsedInput.data.email;
  const message = parsedInput.data.message;
  const userId = req.headers["id"];
  const currTime = new Date();

  const obj = {
    userId,
    name,
    email,
    message,
    currTime,
  };

  const newContact = new Contact(obj);
  newContact.save();
  return res.send("Contact Added");
});

export default router;

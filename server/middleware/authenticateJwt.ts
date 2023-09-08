import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../model/schema.js";
import { Request, Response, NextFunction } from "express";

dotenv.config({ path: '../.env' });
// dotenv.config();

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!process.env.SECRET_KEY) {
      throw new Error("2 DATABASE environment variable is not defined.");
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).send(err);
      }

      if (typeof user == "string") {
        return res.status(403).send(err);
      }

      if (!user) {
        return res.status(403).send(err);
      }

      req.headers["id"] = user.id;
      next();
    });
  } else {
    return res.status(401).send("Unauthorised");
  }
};

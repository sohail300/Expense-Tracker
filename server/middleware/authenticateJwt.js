import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {User} from '../model/schema.js';

dotenv.config({ path: './config.env' });

export const Authenticate =async (req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(authHeader){
        const token=authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY,(err,user) => {
            if(err){
                return res.status(403).send(err);
            }

            req.user=user.id;
            next();
        })
    } else {
        return res.status(401).send('Unauthorised')
    }
}


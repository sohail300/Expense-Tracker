const jwt = require('jsonwebtoken');
const User = require("../model/userSchema");

const Authenticate =async (req,res,next)=>{
    console.log("Inside Authenticate 0")
    console.log(req)
    console.log(req.cookies);
    // var responseCookies = req.headers['set-cookie'];
    // console.log(responseCookies);

    // console.log(req.rawHeaders[9]);
    // console.log(req.rawHeaders[9].slice(9,-1));
    
    try {
        console.log("Inside Authenticate 1")
        const token = req.cookie.jwtoken;
        // const token = req.rawHeaders[9].slice(8);
        // let token = '';

        // const cookieHeader = req.rawHeaders.find((header, index) => {
        //     if (header.toLowerCase().includes("jwtoken")) {
        //       return header;
        //     } else {
        //         return -1;
        //     }
        //   });
        //   if (cookieHeader!=-1) {
        //     console.log(cookieHeader)
        //     const jwtokenString = req.rawHeaders[cookieHeader+1];
        //     console.log(jwtokenString)
        //     const [, jwtoken] = jwtokenString.split('=');
        //     // token=jwtoken.slice
        //     console.log(jwtoken);
        //   }

        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});

        console.log("Inside Authenticate 2")
        
        if(!rootUser) {
            console.log('Error inside rootUser')
            throw new Error("User not found")
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        console.log("Inside Authenticate 3")
        next();
    } catch (error) {
        console.log("Unauthorized no token provided")
        console.log(error) ;
        res.status(401).send('Unauthorized no token provided');
    }
}

module.exports =Authenticate;
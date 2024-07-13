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
// import { isLoggedIn } from './middleware/isLoggedIn.js';
// import passport from './middleware/passport';

// Import the entire module
import openid from 'express-openid-connect';

// Destructure the 'auth' object/function from the imported module
const { auth } = openid;

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

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET_KEY,
    baseURL: 'http://localhost:3000',
    clientID: '9OWgIln2egmUJhu0f7txpeVMbIwLUGZh',
    issuerBaseURL: 'https://dev-663g6p3l4t152pfl.us.auth0.com'
  };

  app.use(auth(config));

app.use('/auth', authRoute);
app.use('/contact', contactRoute);
app.use('/api', apiRoute);

app.get('/', (req, res) => {
    res.send('Root Page')
})

app.get('/dashboard', (req, res) => {
    res.send('Dashboard Page')
})

app.get('/login', (req, res) => {
    // res.send('Root Page')
    // console.log(req.oidc)
    // console.log(req.oidc.isAuthenticated)
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})

// app.use(passport.initialize());
// app.use(passport.session());

// app.get("/failed", (req, res) => {
//     res.send("Failed")
// })
// app.get("/success",isLoggedIn, (req, res) => {
//     res.send(`Success`)
// })

// app.get('/google',
//     passport.authenticate('google', {
//             scope:
//                 ['email', 'profile']
//         }
//     ));

// app.get('/google/callback',
//     passport.authenticate('google', {
//         failureRedirect: '/failed',
//     }),
//     function (req, res) {
//         res.redirect('/success')

//     }
// );

// app.get("/logout", (req, res) => {
//     // req.session = null;
//     // req.logout();
//     res.redirect('/');
//     res.send("Logout")
// })

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`App listening at port ${PORT}`);
})
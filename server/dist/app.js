"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const conn_js_1 = require("./db/conn.js");
const auth_js_1 = __importDefault(require("./router/auth.js"));
const contact_js_1 = __importDefault(require("./router/contact.js"));
const api_js_1 = __importDefault(require("./router/api.js"));
// import { isLoggedIn } from './middleware/isLoggedIn.js';
// import passport from './middleware/passport';
// Import the entire module
const express_openid_connect_1 = __importDefault(require("express-openid-connect"));
// Destructure the 'auth' object/function from the imported module
const { auth } = express_openid_connect_1.default;
const app = (0, express_1.default)();
// dotenv.config({ path: '../.env' });
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       fontSrc: ["'self'", "https://fonts.gstatic.com/"]
//     }
//   }));
(0, conn_js_1.connectDB)();
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET_KEY,
    baseURL: 'http://localhost:3000',
    clientID: '9OWgIln2egmUJhu0f7txpeVMbIwLUGZh',
    issuerBaseURL: 'https://dev-663g6p3l4t152pfl.us.auth0.com'
};
app.use(auth(config));
app.use('/auth', auth_js_1.default);
app.use('/contact', contact_js_1.default);
app.use('/api', api_js_1.default);
app.get('/', (req, res) => {
    res.send('Root Page');
});
app.get('/dashboard', (req, res) => {
    res.send('Dashboard Page');
});
app.get('/login', (req, res) => {
    // res.send('Root Page')
    // console.log(req.oidc)
    // console.log(req.oidc.isAuthenticated)
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
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
});

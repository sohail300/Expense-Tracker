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
app.use('/auth', auth_js_1.default);
app.use('/contact', contact_js_1.default);
app.use('/api', api_js_1.default);
app.get('/', (req, res) => {
    res.send('Root Page');
});
const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
    console.log(`App listening at port ${PORT}`);
});

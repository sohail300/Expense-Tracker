"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateJwt_js_1 = require("../middleware/authenticateJwt.js");
const zod_1 = require("zod");
const schema_js_1 = require("../model/schema.js");
const router = express_1.default.Router();
const contactInput = zod_1.z.object({
    name: zod_1.z.string().min(1).max(20),
    email: zod_1.z.string().min(1).max(30).email(),
    message: zod_1.z.string().min(1).max(200),
});
router.post("/contact", authenticateJwt_js_1.Authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const newContact = new schema_js_1.Contact(obj);
    newContact.save();
    return res.send("Contact Added");
}));
exports.default = router;

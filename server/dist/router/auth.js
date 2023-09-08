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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const schema_js_1 = require("../model/schema.js");
const zod_1 = require("zod");
const authenticateJwt_js_1 = require("../middleware/authenticateJwt.js");
// dotenv.config({ path: "../.env" });
dotenv_1.default.config();
const router = express_1.default.Router();
const registerInput = zod_1.z.object({
    name: zod_1.z.string().min(1).max(20),
    email: zod_1.z.string().min(1).max(30).email(),
    password: zod_1.z.string().min(6).max(20),
    cpassword: zod_1.z.string().min(6).max(20),
});
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedInput = registerInput.safeParse(req.body);
        if (parsedInput.success === false) {
            return res.status(411).json({
                msg: parsedInput.error,
            });
        }
        const name = parsedInput.data.name;
        const email = parsedInput.data.email;
        const password = parsedInput.data.password;
        const cpassword = parsedInput.data.cpassword;
        if (password != cpassword) {
            return res.status(401).send("Invalid Credential");
        }
        const user = yield schema_js_1.User.findOne({ email });
        if (user) {
            return res.status(403).send("User already exists");
        }
        else {
            const obj = {
                name,
                email,
                password,
            };
            const newUser = new schema_js_1.User(obj);
            newUser.save();
            console.log("New User created");
            if (!process.env.SECRET_KEY) {
                throw new Error("3 DATABASE environment variable is not defined.");
            }
            const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });
            return res.status(201).json({ msg: "User Created Successfully", token });
        }
    }
    catch (err) {
        res.status(500).send("Internal error: " + err);
    }
}));
const loginInput = zod_1.z.object({
    email: zod_1.z.string().min(1).max(30).email(),
    password: zod_1.z.string().min(6).max(20),
});
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedInput = loginInput.safeParse(req.body);
        if (parsedInput.success === false) {
            return res.status(411).json({
                msg: parsedInput.error,
            });
        }
        const email = parsedInput.data.email;
        const password = parsedInput.data.password;
        const user = yield schema_js_1.User.findOne({ email, password });
        if (!process.env.SECRET_KEY) {
            throw new Error("4 DATABASE environment variable is not defined.");
        }
        if (user) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });
            return res.status(201).json({ msg: "User Created Successfully", token });
        }
        else {
            return res.status(403).send("Invalid Username or Password");
        }
    }
    catch (err) {
        res.status(500).send("Internal error: " + err);
    }
}));
router.get("/profile", authenticateJwt_js_1.Authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.headers["id"];
    console.log(id);
    const user = yield schema_js_1.User.findById(id);
    if (user) {
        const name = user.name;
        return res.json({ msg: "Name", name });
    }
    else {
        return res.send("Error");
    }
}));
router.put("/profile/:id", authenticateJwt_js_1.Authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("1");
    const id = req.params.id;
    const updateData = { name: req.body.name };
    console.log("2");
    const updatedDocument = yield schema_js_1.User.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    });
    if (updatedDocument) {
        res.status(201).send("Document Updated");
    }
    else {
        res.status(404).send("Error");
    }
    console.log("3");
}));
router.get("/me", authenticateJwt_js_1.Authenticate, (req, res) => {
    const id = req.headers["id"];
    return res.json({ msg: "User id", id });
});
router.get("/getprofile", authenticateJwt_js_1.Authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.headers["id"];
    const user = yield schema_js_1.User.findById(id);
    if (user) {
        const name = user.name;
        return res.json({ msg: "Name", name });
    }
    else {
        return res.send("Error");
    }
}));
exports.default = router;

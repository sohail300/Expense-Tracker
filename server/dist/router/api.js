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
const incomeInput = zod_1.z.object({
    title: zod_1.z.string().min(1).max(30),
    amount: zod_1.z.string().min(1).max(10),
    // date: z.date(),
    description: zod_1.z.string().min(1).max(100)
});
router.post('/income', authenticateJwt_js_1.Authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = incomeInput.safeParse(req.body);
    if (parsedInput.success === false) {
        return res.status(411).json({
            msg: parsedInput.error
        });
    }
    const title = parsedInput.data.title;
    const amount = parsedInput.data.amount;
    const date = req.body.date;
    const description = parsedInput.data.description;
    const userId = req.headers['id'];
    const obj = {
        userId, title, amount, date, description, type: "income"
    };
    const newTransaction = new schema_js_1.Transaction(obj);
    newTransaction.save();
    return res.status(201).send('Income set');
}));
const expenseInput = zod_1.z.object({
    title: zod_1.z.string().min(1).max(30),
    amount: zod_1.z.string().min(1).max(10),
    // date: z.date(),
    description: zod_1.z.string().min(1).max(100)
});
router.post('/expense', authenticateJwt_js_1.Authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = expenseInput.safeParse(req.body);
    if (parsedInput.success === false) {
        return res.status(411).json({
            msg: parsedInput.error
        });
    }
    const title = parsedInput.data.title;
    const amount = parsedInput.data.amount;
    const date = req.body.date;
    const description = parsedInput.data.description;
    const userId = req.headers['id'];
    const obj = {
        userId, title, amount, date, description, type: "expense"
    };
    const newTransaction = new schema_js_1.Transaction(obj);
    newTransaction.save();
    return res.status(201).send('Expense set');
}));
router.get('/transactions', authenticateJwt_js_1.Authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers['id'];
        let transactionsArray = [];
        transactionsArray = yield schema_js_1.Transaction.find({ userId: userId });
        return res.status(200).json(transactionsArray);
    }
    catch (err) {
        return res.status(204).send('err');
    }
}));
exports.default = router;

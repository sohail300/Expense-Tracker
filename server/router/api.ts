import express from 'express'
import { Authenticate } from '../middleware/authenticateJwt.js';
import { z } from 'zod'
import { Transaction } from '../model/schema.js';

const router = express.Router();

const incomeInput = z.object({
    title: z.string().min(1).max(30),
    amount: z.string().min(1).max(10),
    // date: z.date(),
    description: z.string().min(1).max(100)
})

router.post('/income', Authenticate, async (req, res) => {
    const parsedInput = incomeInput.safeParse(req.body);

    if (parsedInput.success === false) {
        return res.status(411).json({
            msg: parsedInput.error
        })
    }

    const title = parsedInput.data.title;
    const amount = parsedInput.data.amount;
    const date = req.body.date;
    const description = parsedInput.data.description;

    const userId=req.headers['id'];

    const obj = {
        userId, title, amount, date, description, type: "income"
    }

    const newTransaction = new Transaction(obj);
    newTransaction.save();
    return res.status(201).send('Income set')
})

const expenseInput = z.object({
    title: z.string().min(1).max(30),
    amount: z.string().min(1).max(10),
    // date: z.date(),
    description: z.string().min(1).max(100)
})

router.post('/expense', Authenticate, async (req, res) => {
    const parsedInput = expenseInput.safeParse(req.body);

    if (parsedInput.success === false) {
        return res.status(411).json({
            msg: parsedInput.error
        })
    }

    const title = parsedInput.data.title;
    const amount = parsedInput.data.amount;
    const date = req.body.date;
    const description = parsedInput.data.description;

    const userId=req.headers['id'];

    const obj = {
        userId, title, amount, date, description, type: "expense"
    }

    const newTransaction = new Transaction(obj);
    newTransaction.save();
    return res.status(201).send('Expense set')
})

router.get('/transactions', Authenticate, async (req, res) => {
    try {
        const userId=req.headers['id'];

        let transactionsArray = [];

        transactionsArray = await Transaction.find({ userId: userId })

        return res.status(200).json(transactionsArray);
    } catch (err) {
        return res.status(204).send('err')
    }
})

export default router;
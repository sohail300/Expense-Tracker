"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = exports.Transaction = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String
});
const transactionSchema = new mongoose_1.default.Schema({
    userId: String,
    title: String,
    amount: Number,
    date: Date,
    description: String,
    type: String
});
const ContactSchema = new mongoose_1.default.Schema({
    userId: String,
    id: String,
    name: String,
    email: String,
    message: String,
    time: Date,
});
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
const Transaction = mongoose_1.default.model("Transaction", transactionSchema);
exports.Transaction = Transaction;
const Contact = mongoose_1.default.model("Contact", ContactSchema);
exports.Contact = Contact;

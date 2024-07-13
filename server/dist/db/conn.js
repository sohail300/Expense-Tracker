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
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// dotenv.config({ path: '../.env' });
dotenv_1.default.config();
const DB = process.env.DATABASE;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!DB) {
                throw new Error("1 DATABASE environment variable is not defined.");
            }
            const uri = DB;
            yield mongoose_1.default.connect(uri);
            console.log("Database connected");
        }
        catch (err) {
            console.log("Error connecting to DB: " + err);
        }
    });
}
exports.connectDB = connectDB;

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
exports.createUser = exports.retrieveUsers = void 0;
const pg_1 = require("pg");
const pg_init_1 = __importDefault(require("../../pg_init"));
const user_model_1 = __importDefault(require("../models/user.model"));
const pool = new pg_1.Pool(pg_init_1.default);
const retrieveUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield user_model_1.default.getUser();
    response.rows[0]
        ? res.json({ data: response.rows })
        : res.status(404).json({ message: 'Users not yet created' });
});
exports.retrieveUsers = retrieveUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { age, email, name, username, isLogged } = req.body;
    try {
        yield user_model_1.default.createUser({ age, email, name, username, isLogged });
        res.status(200).json({
            message: 'User created',
            name
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Incorrect / Missing field.' });
    }
});
exports.createUser = createUser;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pg_init_1 = __importDefault(require("../../pg_init"));
const pool = new pg_1.Pool(pg_init_1.default);
const getUser = () => {
    return pool.query('SELECT * FROM USERS');
};
const createUser = (params) => {
    const array = Object.values(params);
    return pool.query(`INSERT INTO users VALUES (age, email, name, username)
         VALUES ($1, $2, $3, $4) RETURNING *`, array);
};
exports.default = {
    getUser,
    createUser
};

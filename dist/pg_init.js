"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const { HOST, PORT, PASSWORD } = process.env;
const connectionPool = {
    HOST,
    user: 'postgres',
    PASSWORD,
    database: 'typetest',
    PORT
};
exports.default = connectionPool;

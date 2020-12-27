"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pg_init_1 = __importDefault(require("../../pg_init"));
const pool = new pg_1.Pool(pg_init_1.default);
const toArray = (data) => {
    return Object.values(data);
};
const saveDataResults = (params) => {
    const array = toArray(params);
    return pool.query(`INSERT INTO data_request
     VALUES (year, department, name, description, sector, product, email)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, array);
};
const retrieveData = () => {
    //const array = toArray();
    return pool.query(`SELECT * from data_request
     RETURNING *`);
};
exports.default = {
    saveDataResults,
    retrieveData
};

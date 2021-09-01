"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSchema = void 0;
const mongoose_1 = require("mongoose");
const dataResults = new mongoose_1.Schema({
    sector: { type: String, required: true },
    product: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: String, required: true },
});
const DataSchema = new mongoose_1.Schema({
    data: [dataResults],
    timestamp: { type: Date, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
});
exports.DataSchema = DataSchema;

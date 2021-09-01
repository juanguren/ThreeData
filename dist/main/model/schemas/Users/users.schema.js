"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    entryCount: { type: Number, required: false, default: 0 },
    data: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Data" }],
});
exports.UserSchema = UserSchema;

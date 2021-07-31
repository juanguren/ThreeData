"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const users_schema_1 = require("./users.schema");
exports.default = mongoose_1.model("User", users_schema_1.UserSchema);

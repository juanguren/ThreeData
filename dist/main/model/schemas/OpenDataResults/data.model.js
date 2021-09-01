"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const data_schema_1 = require("./data.schema");
exports.default = mongoose_1.model("Data", data_schema_1.DataSchema);

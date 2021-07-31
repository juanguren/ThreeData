"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_operations_1 = require("../controllers/data/data_operations");
const dataRouter = express_1.Router();
dataRouter.use(express_1.json());
dataRouter.post("/send", data_operations_1.validateDataPackage, data_operations_1.validateRecipient);
exports.default = dataRouter;

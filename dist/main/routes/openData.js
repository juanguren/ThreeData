"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_operations_1 = require("../controllers/data/data_operations");
const dataRouter = (0, express_1.Router)();
dataRouter.use((0, express_1.json)());
dataRouter.get('/:username', data_operations_1.checkForUserQueries);
dataRouter.post('/send', data_operations_1.validateDataPackage, data_operations_1.validateRecipient);
exports.default = dataRouter;

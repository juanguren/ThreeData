"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openMiddlewares_1 = require("../controllers/openMiddlewares");
const dataRouter = express_1.Router();
dataRouter.use(express_1.json());
dataRouter.post("/getData", openMiddlewares_1.validateParams, openMiddlewares_1.retrieveOpenData);
dataRouter.post("/sendData", openMiddlewares_1.sendMessageWithData);
exports.default = dataRouter;

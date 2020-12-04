"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware1_1 = require("../controllers/middleware1");
const pg_middleware_1 = require("../controllers/pg_middleware");
const testRouter = express_1.Router();
testRouter.use(express_1.json());
testRouter.get("/users", pg_middleware_1.retrieveUsers);
testRouter.post("/users", pg_middleware_1.createUser);
testRouter.get("/:data", middleware1_1.receiveData);
exports.default = testRouter;
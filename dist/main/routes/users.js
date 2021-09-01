"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_operations_1 = require("../controllers/users/user_operations");
const userRouter = express_1.Router();
userRouter.use(express_1.json());
userRouter.get('/:username', user_operations_1.getUser);
userRouter.post('/', user_operations_1.validateUserData, user_operations_1.createNewUser);
userRouter.delete('/:username', user_operations_1.deleteUser);
exports.default = userRouter;

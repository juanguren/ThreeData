"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.validateUserData = exports.createNewUser = exports.getUser = void 0;
const utils_1 = require("../utils");
const users_static_1 = __importDefault(require("../../model/schemas/Users/users.static"));
const users_static_2 = require("../../model/schemas/Users/users.static");
const validateUserData = (req, res, next) => {
    const { first_name, last_name, email, username } = req.body;
    if (first_name && last_name && email && username) {
        if ((0, utils_1.checkForValidEmail)(email))
            return next();
        return res
            .status(400)
            .json({ error: 'Please check the provided email!', email });
    }
    else {
        res.status(400).json({ error: 'Please check the provided user values!' });
    }
};
exports.validateUserData = validateUserData;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        const foundUser = yield users_static_1.default.getUser(username);
        if (foundUser)
            return res.status(200).json(foundUser);
        return res.status(404).json((0, utils_1.userNotFoundHandler)(username));
    }
    catch (error) {
        return res
            .status(400)
            .json({ message: 'Error retrieving user data', error });
    }
});
exports.getUser = getUser;
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, username } = req.body;
    try {
        const user = new users_static_2.User(first_name, last_name, email, username);
        const userCreated = yield user.save();
        if (userCreated.username)
            return res.status(201).json({ message: `User ${username} created` });
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});
exports.createNewUser = createNewUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        const wasDeleted = yield users_static_1.default.deleteUser(username);
        if (wasDeleted instanceof Error)
            return res
                .status(400)
                .json({ message: `User ${username} doesn't exist` });
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting user', error });
    }
});
exports.deleteUser = deleteUser;

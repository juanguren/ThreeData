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
exports.validateRecipient = exports.validateDataPackage = void 0;
const sendgrid_1 = __importDefault(require("../../services/sendgrid"));
const users_static_1 = __importDefault(require("../../model/schemas/Users/users.static"));
const open_data_1 = __importDefault(require("../../services/open_data"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateDataPackage = (req, res, next) => {
    const { year, department } = req.body.data_package;
    const validParams = ["year", "department"];
    year && department
        ? next()
        : res.status(422).json({ message: "Error, missing param", validParams });
};
exports.validateDataPackage = validateDataPackage;
const validateRecipient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body.recipient;
    try {
        const foundUser = yield users_static_1.default.getUser(username);
        if (foundUser.username)
            executeOperation(req, res, foundUser, username);
    }
    catch (error) {
        res
            .status(422)
            .json({ message: "Please check the username", username, error });
    }
});
exports.validateRecipient = validateRecipient;
const executeOperation = (req, res, userData, username) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, department, limit } = req.body.data_package;
    const { APP_TOKEN } = process.env;
    try {
        const dataToSend = yield open_data_1.default(year, department, APP_TOKEN, limit);
        const sendMessage = yield sendgrid_1.default(userData, dataToSend);
        const { status: code, message } = sendMessage;
        if (code === 202)
            yield users_static_1.default.updateUserSearchCount(username);
        res.status(code).json({ message });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

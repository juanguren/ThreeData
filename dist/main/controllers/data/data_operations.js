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
exports.checkForUserQueries = exports.validateRecipient = exports.validateDataPackage = void 0;
const sendgrid_1 = __importDefault(require("../../services/sendgrid"));
const users_static_1 = __importDefault(require("../../model/schemas/Users/users.static"));
const data_static_1 = __importDefault(require("../../model/schemas/OpenDataResults/data.static"));
const utils_1 = require("../utils");
const open_data_1 = __importDefault(require("../../services/open_data"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateDataPackage = (req, res, next) => {
    const { year, department } = req.body.data_package;
    const validParams = ['year', 'department'];
    if (year && department) {
        if (utils_1.validDepartments.includes(department)) {
            next();
        }
        else {
            return res.status(422).json({
                message: 'Please check the "department"',
                received: department,
            });
        }
    }
    else {
        return res
            .status(422)
            .json({ message: 'Error, missing param', validParams });
    }
};
exports.validateDataPackage = validateDataPackage;
const validateRecipient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body.recipient;
    try {
        const foundUser = yield users_static_1.default.getUser(username);
        if (foundUser.username)
            yield executeOperation(req, res, foundUser, username);
    }
    catch (error) {
        res
            .status(422)
            .json({ message: 'Please check the username', username, error });
    }
});
exports.validateRecipient = validateRecipient;
const executeOperation = (req, res, userData, username) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = userData;
    const { year, department, limit } = req.body.data_package;
    const { APP_TOKEN } = process.env;
    try {
        const openDataResult = yield open_data_1.default(year, department, APP_TOKEN, limit);
        const sendMessage = yield sendgrid_1.default(userData, openDataResult);
        const { status: code, message } = sendMessage;
        if (code === 202) {
            const timestamp = new Date();
            const organizedData = utils_1.organizeDataIntoRecords(openDataResult);
            const dataRecordObject = {
                data: organizedData,
                timestamp,
                user: userId,
            };
            const dataRecord = yield data_static_1.default.saveDataRecord(dataRecordObject);
            if (dataRecord.id) {
                yield users_static_1.default.updateUserSearchCount(username);
                return res.status(code).json({ message });
            }
            else {
                throw 'Error updating userCount.';
            }
        }
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
const checkForUserQueries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        const foundUser = yield users_static_1.default.getUser(username);
        if (foundUser) {
            const { _id: userId } = foundUser;
            const dataResult = yield data_static_1.default.getQueries(userId);
            res.status(200).json(dataResult);
        }
        else {
            res.status(404).json(utils_1.userNotFoundHandler(username));
        }
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.checkForUserQueries = checkForUserQueries;

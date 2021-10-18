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
const mail_1 = __importDefault(require("@sendgrid/mail"));
const messageTemplate_1 = require("../view/messageTemplate");
const sendMessageWithData = (userData, openData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    const SENDGRID_KEY = process.env.SENDGRID_KEY;
    try {
        mail_1.default.setApiKey(SENDGRID_KEY);
        const messageBody = {
            to: email,
            from: 'juanararo@unisabana.edu.co',
            subject: 'HEY!',
        };
        const messageLayout = (0, messageTemplate_1.constructMessageLayout)(openData, userData);
        messageBody.html = messageLayout;
        const messageResponse = yield mail_1.default.send(messageBody);
        const code = messageResponse[0].statusCode;
        return {
            status: code,
            message: `Package succesfully sent to ${email}`,
        };
    }
    catch (error) {
        return {
            status: `${error === null || error === void 0 ? void 0 : error.statusCode}` || error || undefined,
            message: 'Error in Message Operation',
            error,
        };
    }
});
exports.default = sendMessageWithData;

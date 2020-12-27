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
exports.sendMessageWithData = exports.validateParams = exports.retrieveOpenData = void 0;
const axios_1 = __importDefault(require("axios"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const messageTemplate_1 = require("../view/messageTemplate");
const validateParams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { año, departamento } = req.body;
    const validParams = [
        'año',
        'departamento',
    ];
    año && departamento ? next() : res.status(422).json({ message: 'Error, missing param', validParams });
});
exports.validateParams = validateParams;
const retrieveOpenData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { APP_TOKEN } = process.env;
        const { año: year, departamento: dpto } = req.body;
        const request = yield axios_1.default.get(`https://www.datos.gov.co/resource/rggv-qcwf.json?a_o=${year}&departamento=${dpto}`, {
            headers: {
                'X-App-Token': APP_TOKEN
            }
        }).catch((error) => { throw Error(error); });
        const finalData = request.data;
        const mappedData = finalData.map((all) => {
            return {
                department: all.departamento,
                description: all.descripci_n,
                email: all.correo_electronico,
                name: all.raz_n_social,
                product: all.producto_principal,
                sector: all.sector,
                year: all.a_o
            };
        });
        finalData == ""
            ? res.status(400).json({ "message": "Empty response" })
            : res.status(200).json(mappedData);
    }
    catch (error) {
        res.status(404).json(error);
    }
});
exports.retrieveOpenData = retrieveOpenData;
const sendMessageWithData = (req, res, next) => {
    const { PERSONAL_EMAIL, EDU_EMAIL } = process.env;
    const sendGridAPI = process.env.SEND_API;
    mail_1.default.setApiKey(sendGridAPI);
    const messageBody = {
        "to": PERSONAL_EMAIL,
        "from": EDU_EMAIL,
        "subject": "HEY!"
    };
    const messageLayout = messageTemplate_1.constructMessageLayout(req.body);
    messageBody.html = messageLayout;
    try {
        if (req.body) {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const messageResponse = yield mail_1.default.send(messageBody);
                    const code = messageResponse[0].statusCode;
                    code === 202
                        ? res.status(code).json({ Message: `Email succesfully sent to *${messageBody.to}*` })
                        : res.status(404).json({ Error: "Message failed" });
                }
                catch (error) {
                    console.error(error);
                    if (error.response) {
                        const error_message = error.response.body.errors;
                        return res.status(error.code).json(error_message);
                    }
                }
            }))();
        }
        else {
            res.status(422).json({ Message: "Unprocessable payload. Please check all values are complete" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.sendMessageWithData = sendMessageWithData;

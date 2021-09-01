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
const data_model_1 = __importDefault(require("./data.model"));
// * https://medium.com/@mendes.develop/joining-tables-in-mongodb-with-mongoose-489d72c84b60
const saveDataRecord = (dataObject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield data_model_1.default.create(dataObject);
    }
    catch (error) {
        return error;
    }
});
const getQueries = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield data_model_1.default.findOne({ user: userId });
    }
    catch (error) {
        return error;
    }
});
exports.default = {
    saveDataRecord,
    getQueries,
};

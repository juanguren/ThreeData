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
const axios_1 = __importDefault(require("axios"));
const retrieveOpenData = (year, department, xToken, limit = 3) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`https://www.datos.gov.co/resource/rggv-qcwf.json?a_o=${year}&departamento=${department}`, {
            headers: {
                "X-App-Token": xToken,
            },
        });
        const response = request.data;
        if (response.length === 0)
            throw "Empty Data response.";
        const arrangedData = response
            .slice(0, limit)
            .map((all) => {
            return {
                department: all.departamento,
                description: all.descripci_n,
                email: all.correo_electronico,
                name: all.raz_n_social,
                product: all.producto_principal,
                sector: all.sector,
                year: all.a_o,
            };
        });
        return arrangedData;
    }
    catch (error) {
        return error;
    }
});
exports.default = retrieveOpenData;

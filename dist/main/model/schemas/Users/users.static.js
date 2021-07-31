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
const users_model_1 = __importDefault(require("./users.model"));
const createUser = (user, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExists = yield users_model_1.default.findOne({ username: username });
        if (userExists)
            return userExists;
        return yield users_model_1.default.create(user);
    }
    catch (error) {
        return error;
    }
});
const getUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield users_model_1.default.findOne({ username: username });
    }
    catch (error) {
        return error;
    }
});
const deleteUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield users_model_1.default.findOneAndDelete({ username: username });
    }
    catch (error) {
        return error;
    }
});
const updateUserSearchCount = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updatedCount = 1;
        const foundUser = yield users_model_1.default.findOne({ username: username });
        if (foundUser)
            updatedCount += foundUser.entryCount;
        return yield users_model_1.default.findOneAndUpdate({ username: username }, { entryCount: updatedCount });
    }
    catch (error) {
        return error;
    }
});
exports.default = { createUser, getUser, deleteUser, updateUserSearchCount };

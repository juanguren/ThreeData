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
exports.User = void 0;
const users_model_1 = __importDefault(require("./users.model"));
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
        const foundUser = yield users_model_1.default.findOneAndDelete({ username: username });
        if (foundUser === null || foundUser === void 0 ? void 0 : foundUser.first_name) {
            return true;
        }
        else {
            return Error();
        }
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
/**
 * The class below served as a OOP learning opportunity. I realize it may not be very efficient to combine both
 * functional and object-oriented programming in a single file.
 */
class User {
    constructor(first_name, last_name, email, username, entryCount) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.username = username;
        this.entryCount = entryCount;
        this.getUser = (username) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield users_model_1.default.findOne({ username: username });
            }
            catch (error) {
                return error;
            }
        });
        this.save = () => __awaiter(this, void 0, void 0, function* () {
            const userObject = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                username: this.username,
            };
            try {
                const userExists = yield this.getUser(this.username);
                if (userExists)
                    return userExists;
                return yield users_model_1.default.create(userObject);
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.User = User;
exports.default = {
    getUser,
    deleteUser,
    updateUserSearchCount,
};

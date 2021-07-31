"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForValidEmail = void 0;
const checkForValidEmail = (email) => {
    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if (email.match(emailRegex))
        return true;
    return false;
};
exports.checkForValidEmail = checkForValidEmail;

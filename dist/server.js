"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const openData_1 = __importDefault(require("./main/routes/openData"));
const users_1 = __importDefault(require("./main/routes/users"));
const config_1 = __importDefault(require("./main/model/config"));
const PORT = 5000 || 3000;
const app = express_1.default();
app.get("/", (_req, res) => {
    res.status(200).json({ msg: "HEY", date: moment_1.default(new Date()) });
});
app.use("/data", openData_1.default);
app.use("/user", users_1.default);
config_1.default(); // connect to DB
app.listen(PORT, () => {
    console.log("Listening in port " + PORT);
});

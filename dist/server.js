"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const users_1 = __importDefault(require("./main/routes/users"));
const openData_1 = __importDefault(require("./main/routes/openData"));
const PORT = 5000 || 3000;
const app = express_1.default();
app.get("/", (_req, res) => {
    res.status(200).json({ msg: "HEY", date: moment_1.default(new Date()) });
});
app.use("/index", users_1.default);
app.use("/data", openData_1.default);
app.listen(PORT, () => {
    console.log("Listening in port " + PORT);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveData = void 0;
const receiveData = (req, res) => {
    const data = req.params.data;
    data == "10" ? handleData(req, res, data) : res.status(422).send("nope");
};
exports.receiveData = receiveData;
const handleData = (req, res, data) => {
    res.json({ result: data });
};

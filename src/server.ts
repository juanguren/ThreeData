import express, { Request, Response } from 'express';
import moment from "moment";
import testRouter from "./main/routes/users";

const PORT = 5000 || 3000;
const app = express();

app.get("/", (_req : Request, res : Response) =>{
    res.status(200).json({msg: "HEY", date: moment(new Date())});
});

app.use("/index", testRouter);

app.listen(PORT, () => {
    console.log("Listening in port " + PORT);
})
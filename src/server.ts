import express, { Request, Response } from "express";
import moment from "moment";
import dataRouter from "./main/routes/openData";
import userRouter from "./main/routes/users";
import databaseConnection from "./main/model/config";

const PORT = 5000 || 3000;
const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ msg: "HEY", date: moment(new Date()) });
});

app.use("/data", dataRouter);
app.use("/user", userRouter);

databaseConnection(); // connect to DB

app.listen(PORT, () => {
  console.log("Listening in port " + PORT);
});

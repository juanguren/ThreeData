import express, { Request, Response } from "express";
import moment from "moment";
import dataRouter from "./main/routes/openData";

const PORT = 5000 || 3000;
const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ msg: "HEY", date: moment(new Date()) });
});

app.use("/", dataRouter);

app.listen(PORT, () => {
  console.log("Listening in port " + PORT);
});

import { Router, json } from "express";
import {
  retrieveOpenData,
  validateParams,
  sendMessageWithData,
} from "../controllers/data/data_operations";

const dataRouter = Router();
dataRouter.use(json());

dataRouter.get("/get", validateParams, retrieveOpenData);
dataRouter.post("/send", sendMessageWithData);

export default dataRouter;

import { Router, json } from "express";
import {
  retrieveOpenData,
  validateParams,
  sendMessageWithData,
} from "../controllers/operations";

const dataRouter = Router();
dataRouter.use(json());

dataRouter.post("/getData", validateParams, retrieveOpenData);
dataRouter.post("/sendData", sendMessageWithData);

export default dataRouter;

import { Router, json } from "express";
import {
  retrieveOpenData,
  validateParams,
  sendMessageWithData,
} from "../controllers/operations";

const dataRouter = Router();
dataRouter.use(json());

dataRouter.get("/data", validateParams, retrieveOpenData);
dataRouter.post("/data", sendMessageWithData);

export default dataRouter;

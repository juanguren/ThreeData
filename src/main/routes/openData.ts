import { Router, json } from "express";
import {
  retrieveOpenData,
  validateDataPackage,
  sendMessageWithData,
  validateRecipient,
} from "../controllers/data/data_operations";

const dataRouter = Router();
dataRouter.use(json());

dataRouter.post(
  "/send",
  validateDataPackage,
  validateRecipient,
  retrieveOpenData
);

export default dataRouter;

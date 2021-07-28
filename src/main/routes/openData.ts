import { Router, json } from "express";
import {
  validateDataPackage,
  validateRecipient,
} from "../controllers/data/data_operations";

const dataRouter = Router();
dataRouter.use(json());

dataRouter.post("/send", validateDataPackage, validateRecipient);

export default dataRouter;

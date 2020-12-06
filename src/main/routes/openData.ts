
import { Router, json } from 'express';
import {
    retrieveOpenData,
    saveFoundData,
    validateParams
} from '../controllers/openMiddlewares';

const dataRouter = Router();
dataRouter.use(json());

dataRouter.post("/openData",
 validateParams,
 retrieveOpenData,
 saveFoundData
);

export default dataRouter;
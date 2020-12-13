
import { Router, json } from 'express';
import {
    retrieveOpenData,
    saveFoundData,
    validateParams,
    retrieveSavedData
} from '../controllers/openMiddlewares';

const dataRouter = Router();
dataRouter.use(json());

dataRouter.post("/getData", 
    validateParams,
    retrieveOpenData,
    saveFoundData
);

dataRouter.post("/sendData",
    retrieveSavedData
);

export default dataRouter;
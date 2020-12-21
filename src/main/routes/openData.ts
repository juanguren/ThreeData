
import { Router, json } from 'express';
import {
    retrieveOpenData,
    saveFoundData,
    validateParams,
    retrieveSavedData,
    sendMessageWithData
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

dataRouter.post("testMsg", 
    sendMessageWithData
);

export default dataRouter;
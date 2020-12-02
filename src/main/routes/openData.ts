
import { Router, json } from 'express';
import {
    retrieveOpenData,
    saveFoundData
} from '../controllers/openMiddlewares';

const dataRouter = Router();
dataRouter.use(json());

dataRouter.get("/", retrieveOpenData, saveFoundData);

export default dataRouter;
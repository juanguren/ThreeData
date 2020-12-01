
import { Router, json } from 'express';
import {
    retrieveOpenData
} from '../controllers/openMiddlewares';

const dataRouter = Router();
dataRouter.use(json());

dataRouter.get("/", retrieveOpenData);

export default dataRouter;


import { Router, json } from 'express';
import {
    receiveData
} from "../controllers/middleware1";
import {
    retrieveUsers,
    createUser
} from '../controllers/pg_middleware';

const testRouter = Router();
testRouter.use(json());

testRouter.get("/users", retrieveUsers);
testRouter.post("/users", createUser);
testRouter.get("/:data", receiveData);

export default testRouter;
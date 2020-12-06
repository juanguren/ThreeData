

import { Router, json } from 'express';
import {
    receiveData
} from "../controllers/middleware1";
import {
    retrieveUsers,
    createUser
} from '../controllers/userMiddleware';

const userRouter = Router();
userRouter.use(json());

userRouter.get("/users", retrieveUsers);
userRouter.post("/users", createUser);
userRouter.get("/:data", receiveData);

export default userRouter;
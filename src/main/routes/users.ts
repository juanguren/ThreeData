import { Router, json } from "express";
import {
  getUser,
  createNewUser,
  validateUserData,
  deleteUser,
} from "../controllers/users/user_operations";

const userRouter = Router();
userRouter.use(json());

userRouter.get("/:username", getUser);
userRouter.post("/", validateUserData, createNewUser);
userRouter.delete("/:username", deleteUser);

export default userRouter;

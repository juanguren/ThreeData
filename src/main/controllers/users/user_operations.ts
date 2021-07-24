import { Request, Response, NextFunction } from "express";
import { checkForValidEmail } from "../utils";
import UserService from "../../model/schemas/Users/users.static";

const validateUserData = (req: Request, res: Response, next: NextFunction) => {
  const { fullName, email, username } = req.body;
  if (fullName && email && username) {
    if (checkForValidEmail(email)) {
      next();
    } else {
      res.status(400).json({ error: "Please check the email!", email });
    }
  } else {
    res
      .status(400)
      .json({ error: "Please check the user values!", fullName, username });
  }
};

const getUser = (req: Request, res: Response) => {};

const createNewUser = (req: Request, res: Response) => {};

export { getUser, createNewUser, validateUserData };

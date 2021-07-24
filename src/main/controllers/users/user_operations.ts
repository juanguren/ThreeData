import { Request, Response, NextFunction } from "express";
import { checkForValidEmail } from "../utils";
import UserService from "../../model/schemas/Users/users.static";

const validateUserData = (req: Request, res: Response, next: NextFunction) => {
  const { first_name, last_name, email, username } = req.body;
  if (first_name && last_name && email && username) {
    if (checkForValidEmail(email)) {
      next();
    } else {
      res.status(400).json({ error: "Please check the email!", email });
    }
  } else {
    res.status(400).json({ error: "Please check the user values!" });
  }
};

const getUser = (req: Request, res: Response) => {};

const createNewUser = async (req: Request, res: Response) => {
  const user = req.body;
  const { username } = req.body;
  try {
    const serverResponse = await UserService.createUser(user, username);
    if (serverResponse.username)
      return res.status(200).json({ message: `User ${username} created` });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

export { getUser, createNewUser, validateUserData };
